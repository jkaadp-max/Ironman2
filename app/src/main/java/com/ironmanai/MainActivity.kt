package com.ironmanai

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.view.Gravity
import android.widget.LinearLayout
import android.widget.TextView

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(32, 32, 32, 32)
            setBackgroundColor(Color.rgb(3, 12, 25))
        }
        val title = TextView(this).apply {
            text = "IRON MAN AI"
            textSize = 30f
            setTextColor(Color.rgb(84, 234, 255))
            gravity = Gravity.CENTER
        }
        val status = TextView(this).apply {
            text = "Android app foundation ready. Voice and AI connection are next."
            textSize = 16f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER
            setPadding(0, 24, 0, 0)
        }
        layout.addView(title)
        layout.addView(status)
        setContentView(layout)
    }
}
