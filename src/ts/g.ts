/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

/* function getLength(jumpings: number[]): number {
  let totalNumber = 0;

  totalNumber = jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );

  return totalNumber;
} */

export function getLength (totalJumpDistance: number[]): number {
  return totalJumpDistance.reduce((jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump);
};

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

/* class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
} 

function getStudentStatus(student: Student): string {
  student.passed =
    student.name == "Sebastian"
      ? student.handedInOnTime
        ? true
        : false
      : false;

  if (student.passed) {
    return "VG";
  } else {
    return "IG";
  }
}*/

export class Student {
  constructor (
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {};
};

export function getStudentStatus(student: Student): string {
  if (student.name === 'Sebastian') {
    if (student.handedInOnTime) {
      if (student.passed) {
        return 'VG';
      } else {
        student.passed = false;
        return 'IG';
      };
    } else {
      student.passed = false;
      return 'IG';
    };
  } else {
    student.passed = false;
    return 'IG';
  };
};

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

/* class Temp {
  constructor(public q: string, public where: Date, public v: number) {}
}

function averageWeeklyTemperature(heights: Temp[]) {
  let r = 0;

  for (let who = 0; who < heights.length; who++) {
    if (heights[who].q === "Stockholm") {
      if (heights[who].where.getTime() > Date.now() - 604800000) {
        r += heights[who].v;
      }
    }
  }

  return r / 7;
} */

export class Temperature {
  constructor (
    public location: string, 
    public time: Date, 
    public temperature: number
    ) {};
};

export function averageWeeklyTemperature (measurements: Temperature[]) {
  let sumOfTemperatures = 0;

  for (let i = 0; i < measurements.length; i++) {
    if (measurements[i].location === 'Stockholm' && measurements[i].time.getTime() >= Date.now() - 604800000) {
      sumOfTemperatures += measurements[i].temperature;
    };
  };

  return sumOfTemperatures / 7;
};

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

/* function showProduct(
  name: string,
  price: number,
  amount: number,
  description: string,
  image: string,
  parent: HTMLElement
) {
  let container = document.createElement("div");
  let title = document.createElement("h4");
  let pris = document.createElement("strong");
  let imageTag = document.createElement("img");

  title.innerHTML = name;
  pris.innerHTML = price.toString();
  imageTag.src = image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(pris);
  parent.appendChild(container);
} */

export class Product {
  constructor (
    public name: string,
    public price: number,
    public amount: number,
    public description: string,
    public image: string,
    public parent: HTMLDivElement
  ) {};
};

export function showProduct(product: Product): HTMLDivElement {
  const container = document.createElement('div');
  const title = document.createElement('h4');
  const price = document.createElement('strong');
  const image = document.createElement('img');

  title.textContent = product.name;
  price.textContent = product.price.toString();
  image.src = product.image;

  container.appendChild(title);
  container.appendChild(image);
  container.appendChild(price);
  product.parent.appendChild(container);

  return container;
};

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
/* function presentStudents(students: Student[]) {
  for (const student of students) {
    if (student.handedInOnTime) {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#passedstudents");
      listOfStudents?.appendChild(container);
    } else {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#failedstudents");
      listOfStudents?.appendChild(container);
    }
  }
} */

export function presentStudents(students: Student[]) {
  const listOfPassedStudents = document.querySelector<HTMLUListElement>('#passedstudents');
  const listOfFailedStudents = document.querySelector<HTMLUListElement>('#failedstudents');

  for (const student of students) {
    const container = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    if (student.handedInOnTime && student.passed) {
      checkbox.checked = true;
      container.appendChild(checkbox);
      listOfPassedStudents?.appendChild(container);
    } else if (student.handedInOnTime && !student.passed) {
      checkbox.checked = false;
      container.appendChild(checkbox);
      listOfFailedStudents?.appendChild(container);
    } else if (!student.handedInOnTime) {
      checkbox.checked = false;
      container.appendChild(checkbox);
      listOfFailedStudents?.appendChild(container);
    };
  };
};

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
/* function concatenateStrings() {
  let result = "";
  result += "Lorem";
  result += "ipsum";
  result += "dolor";
  result += "sit";
  result += "amet";

  return result;
} */

export function concatenateStrings() {
  return `${'Lorem'} ${'ipsum'} ${'dolor'} ${'sit'} ${'amet'}`;
};

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
/* function createUser(
  name: string,
  birthday: Date,
  email: string,
  password: string
) {
  // Validation

  let ageDiff = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (!(userAge < 20)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
} */

export class User {
  constructor (
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string
  ) {};
};

export function createUser(user: User) {
  const ageDiff = Date.now() - user.birthday.getTime();
  const ageDate = new Date(ageDiff);
  const userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  if ((userAge >= 20)) {
    // Logik för att skapa en användare
  } else {
    return 'Du är under 20 år';
  };
};
