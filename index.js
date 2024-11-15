const inquirer = require('inquirer'); 
const fs = require('fs').promises

console.log('test');


inquirer
      .prompt([
        { type: 'input', name: 'username', message: 'Введи имя:' }])