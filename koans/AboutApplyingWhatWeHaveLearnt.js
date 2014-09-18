var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];
      
      var check = function(product){
        if(product.containsNuts === true || _(product.ingredients).contains("mushrooms")){
          return false;
        }
        else{
          return true;
        }
      }

      /* solve using filter() & all() / any() */
      productsICanEat = products.filter(check);
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var list = _.union(_.range(3,1000,3), _.range(5,1000,5));
      
    var sum = _.chain(list)
              .without(_.range(15,1000,15))
              .reduce(function(m, n){return m+n;}, 0)
              .value();

    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _.chain(products)
      .map(function(product){ return product.ingredients; })
      .flatten()
      .reduce(function(memo,ingredient){ memo[ingredient] = (memo[ingredient] || 0) + 1; return memo}, {})
      .value();
    
    expect(ingredientCount['mushrooms']).toBe(2);
  });

/*Extra Credit Section*/

  it("should find the largest prime factor of a composite number", function () {
    
    function largestPrimeFactorOf(n){    
      var f = 2, loop = true;
      while( loop === true ){
        n>f ? n%f ? f++ : n=n/f : loop = false;
      }
      return n;
    }
    
    expect( largestPrimeFactorOf(1224) ).toBe(17);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function isPalin(str){
      str = str.split('');
      var len = str.length, result = true, offset=0;
      if(len%2){ offset=1; }
      for(var i=0; i<(len-1-offset)/2; i++){
        if(str[i]!==str[len-1-i]){ result = false; break; } 
      }
    return result;
    }
    
    function largestPalinProd(n){
      var x=Math.pow(10,n)-1, y=Math.pow(10,n)-1, loop=true, result=0, temp;
      while( loop === true ){
        temp = x*y;
        if(isPalin(String(temp))){temp>result?result=temp:null;}
        y===Math.pow(10,n-1) ? x===Math.pow(10,n-1) ? loop=false : ( x--, y=Math.pow(10,n)-1 ) : y--;
      }
      return result;
    }
    
    expect( largestPalinProd(3) ).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var primes = [2,3,5,7,11,13,17,19]

    function multiply(){
      var result = 1;
      for(var i = 0; i<arguments.length; i++){
        result = result * arguments[i];
      }
      return result;
    }

    expect( multiply.apply(this,primes) ).toBe(9699690);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function sqrSumDiff(n){
      return ((3*Math.pow(n,2)+2*n)*(1-Math.pow(n,2)))/12;
    }
    expect( sqrSumDiff(5) ).toBe(-170);
  });

  it("should find the 10001st prime", function () {

    function nthPrime(n){
      var results = [2], num = 3;
      while(results.length !== n){
        var prime = true;
        for(var i=0; i<results.length; i++){
          if(num % results[i] === 0){
            prime = false;
            break;
          }
          // divide num by primes in result till prime || !prime
        }
        prime? (results.push(num++)) : num++;
      }
      return results[n-1];
    }

    expect( nthPrime(10001) ).toBe(104743);
  });
  
});
