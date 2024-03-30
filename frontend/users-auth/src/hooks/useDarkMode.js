import React, { useEffect, useState } from 'react'

function useDarkMode() {
    
  const [theme, setTheme] = useState(localStorage.theme) 
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => { //เพื่อทำ side effect หลังจากที่ component ถูก render

    const root = window.document.documentElement; // window คือ object ที่มีความสัมพันธ์กับ window ของ browser //document.documentElement element ของ HTML document ทั้งหมด
    root.classList.remove(colorTheme); //ลบ class ที่ชื่อเป็นค่าของ colorTheme ออกจาก root element
    root.classList.add(theme); //เพื่อเพิ่ม class ที่ชื่อเป็นค่าของ theme เข้าไปใน root element
    localStorage.setItem('theme', theme);

}, [theme, colorTheme]); //จะทำ side effect อีกครั้งเมื่อ theme และ colortheme เปลี่ยนแปลง

return [colorTheme, setTheme]

}

export default useDarkMode