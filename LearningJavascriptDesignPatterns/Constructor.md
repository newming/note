# Constructor 构造器

```js
function car(model, year, miles) {
  this.model = model
  this.year = year
  this.miles = miles
}
Car.prototype.toString = function () {
  return this.model + 'has done ' + this.miles + ' miles'
}
```