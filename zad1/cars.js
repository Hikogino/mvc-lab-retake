const cars = [
    {id: 1, make: "Toyota", model: "Prios", year: 2019, color: "red" },
    {id: 2, make: "Nissan", model: "Juke", year: 2023, color: "grey" },
    {id: 3, make: "Kia", model: "Sportage", year: 2014, color: "white" }
];
const getCars = () => {
    return cars;
}
const getCarInformation = (id) => {
    const car = cars.find(car => car.id === id);
    if (!car) return "Car doesn’t exist";
    return `Make: ${car.make}, Model: ${car.model}, Year: ${car.year}, Color: ${car.color}.`;
  }
  
const getCarAge = (id) => {
    const car = cars.find(car => car.id === id);
    if (!car) return "Car doesn’t exist";
    const carAge = new Date().getFullYear() - car.year;
    return `Car is ${carAge} years old.`;
}
module.exports = {
    getCars,
    getCarInformation,
    getCarAge
  };