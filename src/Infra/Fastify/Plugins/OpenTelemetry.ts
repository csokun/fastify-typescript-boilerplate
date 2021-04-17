import { HttpTraceContext } from '@opentelemetry/core'
import { AsyncHooksContextManager } from '@opentelemetry/context-async-hooks'
import {
    BasicTracerProvider,
    ConsoleSpanExporter,
    SimpleSpanProcessor
} from '@opentelemetry/tracing'
import openTelemetryPlugin from '@autotelic/fastify-opentelemetry'

// OpenTelemetry API Configuration
const provider = new BasicTracerProvider()

provider.addSpanProcessor(
    new SimpleSpanProcessor(new ConsoleSpanExporter())
)

provider.register({
    contextManager: new AsyncHooksContextManager(),
    propagator: new HttpTraceContext()
})

export const OpenTelemetry = openTelemetryPlugin