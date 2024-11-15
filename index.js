const inquirer = require('inquirer'); 
const fs = require('fs').promises


inquirer
      .prompt([
        { type: 'input', name: 'username', message: 'Введи имя:' }])