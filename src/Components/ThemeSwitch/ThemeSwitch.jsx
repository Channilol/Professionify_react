import React from 'react'
import './ThemeSwitch.css'

export function applyTheme(theme) {

}

function switchTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        localStorage.setItem("theme", "light");
        applyTheme("light");
    } else {
        localStorage.setItem("theme", "dark");
        applyTheme("dark");
    }
}



