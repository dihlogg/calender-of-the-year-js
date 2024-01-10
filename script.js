document.addEventListener("DOMContentLoaded", function () {
  const inputBox = document.querySelector(".text-box");
  const calendarContainer = document.querySelector(".calendar");

  document.querySelector(".button-box").addEventListener("click", function () {
    const yearInput = parseInt(inputBox.value);

    if (isNaN(yearInput) || yearInput < 1000 || yearInput > 9999) {
      alert("Please enter a valid 4-digit year.");
      return;
    }

    clearCalendar();
    createCalendar(yearInput);
  });

  function createCalendar(year) {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();

      const monthContainer = document.createElement("div");
      monthContainer.classList.add("month-container");
      calendarContainer.appendChild(monthContainer);

      const monthDiv = document.createElement("div");
      monthDiv.classList.add("month");
      monthDiv.textContent = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(new Date(year, month));

      const table = document.createElement("table");
      const trHeader = document.createElement("tr");

      weekdays.forEach((weekday) => {
        const th = document.createElement("th");
        th.textContent = weekday;
        trHeader.appendChild(th);
      });

      table.appendChild(trHeader);

      let dayCounter = 0;
      let tr = document.createElement("tr");

      for (let i = 0; i < firstDay; i++) {
        const td = document.createElement("td");
        tr.appendChild(td);
        dayCounter++;
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const td = document.createElement("td");
        td.textContent = day;
        tr.appendChild(td);

        if (++dayCounter > 6) {
          table.appendChild(tr);
          tr = document.createElement("tr");
          dayCounter = 0;
        }
      }
      table.appendChild(tr);
      monthContainer.appendChild(monthDiv);
      monthContainer.appendChild(table);
    }
  }

  function clearCalendar() {
    while (calendarContainer.firstChild) {
      calendarContainer.removeChild(calendarContainer.firstChild);
    }
  }
});
