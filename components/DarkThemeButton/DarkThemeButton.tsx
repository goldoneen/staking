import React, { useState } from "react";
import { images } from "../../assets/image";
const DarkThemeButton = () => {
  const [isDarkMode, setIsdarkMode] = useState<boolean>(true);

  const onDarkModeToggle = () => {
    let _div = document.querySelector<HTMLElement>('body') as HTMLElement;
    setIsdarkMode(!isDarkMode);
    //    console.log(_div,'selected div')
    if (isDarkMode) {
      _div.classList.add("At-Black");
    } else {
      _div.classList.remove("At-Black");
    }

  }


  return (
    <section className="At-SectionDarkTheme">
      <div className="container At-Container">
        <div className="row">
          <div className="col-12" onClick={() => onDarkModeToggle()}>
            <button className="At-Btn At-BtnDarkMode"><span className="At-LightText">Light Mode</span><span className="At-DarkText">Dark Mode</span> <i className="icon-sun At-LightText"></i> <i className="icon-moon At-DarkText"></i></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DarkThemeButton;
