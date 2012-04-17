var vows = require('vows'),
    assert = require('assert');

var Alchemist = require('../lib/alchemist'),
    abbreviate = Alchemist.abbreviate,
    addUnits = Alchemist.addUnits,
    convert = Alchemist.convert;

assert.approximately = function(test, base, deviation) {
  if(!deviation) deviation = 0;

  var lowerBound = base - deviation
  var upperBound = base + deviation
  assert.isTrue(test >= lowerBound, 'Expected ' + test + ' to be approximately ' + base + ', within ' + deviation);
  assert.isTrue(test <= upperBound, 'Expected ' + test + ' to be approximately ' + base + ', within ' + deviation);
};

vows.describe('addUnits').addBatch({
  'bits and bytes': function() {
    assert.equal(65, addUnits(1, 'bit', 8, 'bytes'));
  }
});

  //'division
    //assert.equal(2.meters / 1.meters, 2.0)
  //}
  //
//'comparison
  //assert.equal(convert( 5.grams, 0.005.kilograms )
//}


  //'register
    //Alchemist.register(:distance, [:beard_second, :beard_seconds], 5.angstroms)
    //assert.equal(convert( 1.beard_second, 5.angstroms)    
    //Alchemist.register(:temperature, :yeti, [Proc.new{|t| t + 1}, Proc.new{|t| t - 1}])
    //assert.equal(convert( 0.yeti, 1.kelvin)    
  //}
  

  //'meters_times_meters
    //assert.equal(convert(1.meter * 1.meter, 1.square_meter)
  //}
  
  //'meters_times_meters_times_meters
    //assert.equal(convert(1.meter * 2.meter * 3.meter, 6.cubic_meters)
    //assert.equal(convert(2.square_meters * 3.meters, 6.cubic_meters)
  //}

vows.describe('Alchemist').addBatch({
  '.convert': {
    'bits and bytes': function() {
      assert.equal(convert(1, 'bit', 'bytes' ), 0.125)
      assert.approximately(convert(1, 'MB', 'kB'),  1024.0, 0.00001)
      assert.approximately(convert(1, 'MB', 'b'),    8388608.0, 0.00001)
      assert.approximately(convert(1, 'GB', 'B'),    1073741824.0, 0.00001)
      assert.approximately(convert(1, 'MiB', 'KiB'), 1024.0, 0.00001)
      assert.approximately(convert(1, 'MiB', 'b'),   8388608.0, 0.00001)
      assert.approximately(convert(1, 'GiB', 'B'),   1073741824.0, 0.00001)
      Alchemist.useSi = true
      assert.approximately(convert(1, 'GB', 'B'), 1000000000.0, 0.00001)
      assert.approximately(convert(1, 'MB', 'b'), 8000000.0, 0.00001)
      assert.approximately(convert(1, 'MB', 'kB'), 1000.0, 0.00001)
      Alchemist.useSi = false
    },
    
    'feet to miles': function() {
      assert.equal(
        convert(5280, 'feet', 'miles'),
        convert(1, 'mile', 'feet'));
    },
    
    'acres to yards_squared': function() {
      assert.approximately(
        convert(4840, 'square_yards', 'f'),
        convert(1, 'acre', 'square_yards'),
        0.00001);
    },
    
    'gallon to liter': function() {
      assert.approximately(convert(3.785411784, 'L', 'gallons'), 1, 0.00001 );
    },
    
    'lb to kg': function() {
      assert.equal(convert(0.45359237, 'kg', 'lb'), 1);
    },
    
    'temperature': function() {
      assert.approximately(convert(1, 'fahrenheit', 'celsius'), 2.0, 0.00001);
    },
    
    'density': function() {
      assert.equal(convert(1.1058, 'sg', 'brix'), 25);
      assert.equal(convert(13.87, 'brix', 'baume'), 25);
    }
  },

  '.abbreviate': {
    'returns undefined for an unknown unit': function() {
      assert.isUndefined(abbreviate('foobars'));
    },
    'returns an abbreviation for a known unit': function() {
      assert.equal(abbreviate('liter'), 'l');
      assert.equal(abbreviate('liters'), 'l');
    } 
  },

  '.parsePrefix': {
    'returns an exponent and base unit from a unit with a known prefix': function() {
      assert.deepEqual(Alchemist.parsePrefix('km'), { exponent: 1000.0, unit: 'meters' });
    },
    'converts storage volumes to 2-based exponents': function() {
      var result = Alchemist.parsePrefix('kB');
      assert.equal(result.unit, 'bytes');
      assert.approximately(result.exponent, 1024, 0.00001);
    },
    'returns a default exponent for a non-prefixed unit': function() {
      assert.deepEqual(Alchemist.parsePrefix('davies'), { exponent: 1.0, unit: 'davies' });
    }
  }
}).export(module);
