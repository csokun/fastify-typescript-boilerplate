import openTelemetryPlugin from '@autotelic/fastify-opentelemetry'
import {
    ConsoleSpanExporter,
    BatchSpanProcessor
} from '@opentelemetry/tracing'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { NodeTracerProvider } from '@opentelemetry/node'
import { registerInstrumentations } from '@opentelemetry/instrumentation'

const provider = new NodeTracerProvider()

provider.addSpanProcessor(
    new BatchSpanProcessor(new ConsoleSpanExporter())
)

provider.register()

registerInstrumentations({
    instrumentations: [
        new HttpInstrumentation()
    ]
})

export const OpenTelemetry = openTelemetryPlugin