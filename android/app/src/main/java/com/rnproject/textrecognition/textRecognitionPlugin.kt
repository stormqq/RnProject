package com.rnproject.textrecognition

import android.annotation.SuppressLint
import android.graphics.Point
import android.graphics.Rect
import android.media.Image
import androidx.camera.core.ImageProxy
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.google.android.gms.tasks.Task
import com.google.android.gms.tasks.Tasks
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.Text
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin
import com.mrousavy.camera.frameprocessors.VisionCameraProxy
import com.mrousavy.camera.frameprocessors.Frame

class TextRecognitionPlugin(proxy: VisionCameraProxy, options: Map<String, Any>?): FrameProcessorPlugin() {

    override fun callback(frame: Frame, arguments: Map<String, Any>?): Any? {

        val result = WritableNativeMap()

        val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)

        val mediaImage: Image? = frame.getImage()

        if (mediaImage != null) {
            val image = InputImage.fromMediaImage(mediaImage, 0)
            val task: Task<Text> = recognizer.process(image)
            try {
                val text: Text = Tasks.await<Text>(task)
                result.putString("text", text.text)
            } catch (e: Exception) {
                return null
            }
        }

        val data = WritableNativeMap()

        data.putMap("result", result)

        return data
    }
}
