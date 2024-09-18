package com.rnproject.textrecognition

import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.TextRecognizer
import com.mrousavy.camera.frameprocessors.Frame
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin
import com.mrousavy.camera.frameprocessors.VisionCameraProxy
import java.nio.ByteBuffer

class TextRecognitionPlugin(proxy: VisionCameraProxy, options: Map<String, Any>?): FrameProcessorPlugin() {

    private val recognizer: TextRecognizer = TextRecognition.getClient()

    override fun callback(frame: Frame, arguments: Map<String, Any>?): Any? {
        val data = frame.data as ByteBuffer
        val image = InputImage.fromByteBuffer(
            data,
            frame.width,
            frame.height,
            frame.rotation,
            InputImage.IMAGE_FORMAT_NV21
        )

        val result = recognizer.process(image)
            .addOnSuccessListener { visionText ->
                visionText.textBlocks.forEach { block ->
                    block.lines.forEach { line ->
                        println(line.text)
                    }
                }
            }
            .addOnFailureListener { e ->
                println("Text recognition failed: ${e.message}")
            }

        return result
    }
}
