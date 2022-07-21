export interface User {
    username: string;
    token: string;
}

// Typescript basics (Lecture 102)

let data: number | string = 42;     // This variable can either be a string or number.

data = "10";
data = 15;      // Both of these don't cause any issues.

interface Car {
    color: string;
    model: string;
    topSpeed?: number;  // adding the question mark makes it optional
}

const car1: Car = {
    color: 'blue',
    model: 'BMW'
}

const car2: Car = {
    color: 'red',
    model: 'Mercedes',
    topSpeed: 100
}

const multiply = (x: number,y: number): void => {
    x * y;
}