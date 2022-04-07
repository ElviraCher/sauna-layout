export default function filter() {
   const link = document.querySelector(".show__link");
   const arrows = document.querySelectorAll(".arrow");
   const checkbox = document.querySelector(".svg-checkbox-dims");

   function showHideCompany() {
      const companies = document.querySelectorAll(".company");

      for (let i = 5; i < companies.length; i += 1) {
         companies[i].classList.toggle("hidden");
      }
      if (link.innerText === "Посмотреть все") {
         link.innerText = "Скрыть"
      } else {
         link.innerText = "Посмотреть все"
      }
   }

   link.addEventListener("click", showHideCompany);

   function closeAndOpen(arrowClick, i) {
      const item = document.querySelectorAll(".filter__item")[i];
      const list = item.querySelector(".options__list");

      if (arrowClick.className.includes("down")) {
         arrowClick.src = "img/icons/icons.svg#arrow-up";
         list.classList.toggle("hidden");

         arrowClick.classList.remove("svg-arrow-down-dims");
         arrowClick.classList.add("svg-arrow-up-dims");
         console.log(arrowClick.classList);

      } else if (arrowClick.className.includes("up")) {
         arrowClick.src = "img/icons/icons.svg#arrow-down";
         list.classList.toggle("hidden");

         arrowClick.classList.remove("svg-arrow-up-dims");
         arrowClick.classList.add("svg-arrow-down-dims");
         console.log("привет");
         console.log(arrowClick.classList);
      }
   }


   arrows.forEach((arrow, index) => {
      arrow.addEventListener("click", () => { closeAndOpen(arrow, index); });
   })

   function toggleOnAndOff() {
      if (checkbox.className === "svg-checkbox-dims") {
         checkbox.src = "img/icons/icons.svg#checkbox-active";
         checkbox.classList.remove("svg-checkbox-dims");
         checkbox.classList.add("svg-checkbox-active-dims");

      } else if (checkbox.className === "svg-checkbox-active-dims") {
         checkbox.src = "img/icons/icons.svg#checkbox";
         checkbox.classList.remove("svg-checkbox-active-dims");
         checkbox.classList.add("svg-checkbox-dims");
      }
   }

   checkbox.addEventListener("click", toggleOnAndOff);

}