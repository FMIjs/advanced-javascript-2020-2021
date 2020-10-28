Прочетете следното съдържание от посочените файлове. 

Пресметнете успеха на всеки студент, като оценката зависи от оценката и кредитите за съответния предмет (score = (receives/6) * credits ). 

Дадените кредити (в credits.txt) са за отличен успех. 

а) Решете задачата с callbacks и запазете резултата в results.txt. 

б) Използвайте Promises и Promise.all, за да решите задачата.

### Input files:

Students file:
    
Ivan Ivanov 441
    Petko Petkov 442
    Alex Alexandrov 443
    Marks file:
    441 5.0 5.5 6.0
    442 3.5 4.0
    443 6.0 6.0 6.0
Credits file:
    mathematics literature geography
    10.0 10.0 8.0

### Output file:
    {"name":"Ivan  Ivanov","mathematics":"8.33","literature":"9.17","geography":"8.00"},
    {"name":"Petko  Petkov","mathematics":"5.83","literature":"6.67","geography":"5.33"},
    {"name":"Alex  Alexandrov","mathematics":"10.00","literature":"10.00","geography":"800"}

