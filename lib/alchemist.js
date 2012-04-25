var _ = require('underscore');

var Alchemist = function() {};

Alchemist.convert = function(amount, currentUnit, newUnit) {
  var currentPrefix = Alchemist.parsePrefix(currentUnit),
      newPrefix = Alchemist.parsePrefix(newUnit),
      type = Alchemist.conversions[currentPrefix.unit][0],
      base, conversion;

  if(Alchemist.conversionTable[type][currentPrefix.unit] instanceof Array)
    base = Alchemist.conversionTable[type][currentPrefix.unit][0].call(this, amount)
  else
    base = amount * Alchemist.conversionTable[type][currentPrefix.unit];

  base = base * currentPrefix.exponent;

  if(Alchemist.conversionTable[type][newPrefix.unit] instanceof Array)
    conversion = Alchemist.conversionTable[type][newPrefix.unit][1].call(this, base)
  else
    conversion = base / Alchemist.conversionTable[type][newPrefix.unit];

  return conversion / newPrefix.exponent;
};

Alchemist.abbreviate = function(unit) {
  var keys = _.keys(Alchemist.abbreviations);
  return _.find(keys, function(abbr) {
    return _.find(Alchemist.abbreviations[abbr],
      function(name) { return unit == name; });
  });
};

Alchemist.longForm = function(abbreviation) {
  var longForm = Alchemist.abbreviations[abbreviation] ||
    [abbreviation];
  return longForm[0];
};

Alchemist.longForms = function(abbreviation) {
  return Alchemist.abbreviations[abbreviation];
};

Alchemist.useSI = false;

Alchemist.siUnits = ['m', 'meter', 'metre', 'meters', 'metres', 'liter', 'litre', 'litres', 'liters', 'l', 'L', 'farad', 'farads', 'F', 'coulombs', 'C', 'gray', 'grays', 'Gy', 'siemen', 'siemens', 'S', 'mhos', 'mho', 'ohm', 'ohms', 'volt', 'volts', 'V',
'joule', 'joules', 'J', 'newton', 'newtons', 'N', 'lux', 'lx', 'henry', 'henrys', 'H', 'b', 'B', 'bits', 'bytes', 'bit', 'byte', 'lumen', 'lumens', 'lm', 'candela', 'candelas', 'cd',
'tesla', 'teslas', 'T', 'gauss', 'Gs', 'G', 'gram', 'gramme', 'grams', 'grammes', 'g', 'watt', 'watts', 'W', 'pascal', 'pascals', 'Pa',
'becquerel', 'becquerels', 'Bq', 'curie', 'curies', 'Ci'];

Alchemist.abbreviations = {
  B:  ['bytes', 'byte'],
  Bq: ['becquerels', 'becquerel'],
  C:  ['coulombs'],
  Ci: ['curies', 'curie'],
  F:  ['farads', 'farad'],
  Gs: ['gauss'],
  Gy: ['grays', 'gray'],
  H:  ['henrys', 'henry'],
  J:  ['joules', 'joule'],
  N:  ['newtons', 'newton'],
  Pa: ['pascals', 'pascal'],
  S:  ['siemens', 'siemen'],
  T:  ['teslas', 'tesla'],
  V:  ['volts', 'volt'],
  W:  ['watts', 'watt'],
  b:  ['bits', 'bit'],
  cd: ['candelas', 'candela'],
  g:  ['grams', 'gram', 'gramme', 'grammes'],
  l:  ['liters', 'liter', 'litre', 'litres'],
  lm: ['lumens', 'lumen'],
  lx: ['lux'],
  m:  ['meters', 'meter', 'metre', 'metres']
};

Alchemist.operatorActions = {}
Alchemist.conversionTable = {
  absorbed_radiation_dose: {
    "gray": 1.0, "grays": 1.0, "Gy": 1.0,
    "rad": parseFloat('1.0e-2'), "rads": parseFloat('1.0e-2')
  },
  angles: {
    "radian": 1.0, "radians": 1.0,
    "degree": (Math.PI / 180.0), "degrees": (Math.PI / 180.0),
    "arcminute": (Math.PI / 10800.0), "arcminutes": (Math.PI / 10800.0),
    "arcsecond": (Math.PI / 648000.0), "arcseconds": (Math.PI / 648000.0),
    "mil": parseFloat('9.817477e-4'), "mils": parseFloat('9.817477e-4'),
    "revolution": (Math.PI * 2.0), "revolutions": (Math.PI * 2.0),
    "circle":  (Math.PI * 2.0), "circles":  (Math.PI * 2.0),
    "right_angle":  (Math.PI / 2.0), "right_angles":  (Math.PI / 2.0),
    "grad": (Math.PI / 200.0), "grade": (Math.PI / 200.0), "gradian": (Math.PI / 200.0), "gon": (Math.PI / 200.0), "grads": (Math.PI / 200.0), "grades": (Math.PI / 200.0), "gradians": (Math.PI / 200.0), "gons": (Math.PI / 200.0),
    // unusual measurements
    "furman": parseFloat('9.58737992858887e-5'), "furmans": parseFloat('9.58737992858887e-5')
  },
  "area": {
    "square_meter": 1.0, "square_meters": 1.0, "square_metre": 1.0, "square_metres": 1.0,
    "acre": 4046.85642, "acres": 4046.85642, 
    "are": parseFloat('1.0e+2'), "ares": parseFloat('1.0e+2'), "a": parseFloat('1.0e+2'),
    "barn": parseFloat('1.0e-28'), "barns": parseFloat('1.0e-28'), "b": parseFloat('1.0e-28'),
    "circular_mil": parseFloat('5.067075e-10'), "circular_mils": parseFloat('5.067075e-10'),
    "hectare": parseFloat('1.0e+4'), "hectares": parseFloat('1.0e+4'), "ha": parseFloat('1.0e+4'),
    "square_foot": parseFloat('9.290304e-2'), "square_feet": parseFloat('9.290304e-2'),
    "square_inch": parseFloat('6.4516e-4'), "square_inches": parseFloat('6.4516e-4'),
    "square_mile": parseFloat('2.589988e+6'), "square_miles": parseFloat('2.589988e+6'),
    "square_yard": 0.83612736, "square_yards": 0.83612736
  },
  "capacitance": {
    "farad": 1.0, "farads": 1.0, "F": 1.0,
    "abfarad": parseFloat('1.0e+9'), "emu_of_capacitance": parseFloat('1.0e+9'), "abfarads": parseFloat('1.0e+9'), "emus_of_capacitance": parseFloat('1.0e+9'),
    "statfarad": parseFloat('1.112650e-12'), "esu_of_capacitance": parseFloat('1.112650e-12'), "statfarads": parseFloat('1.112650e-12'), "esus_of_capacitance": parseFloat('1.112650e-12')
  },
  "density": {
    "specific_gravity": 1, "sg": 1,
    "brix"    : [function(d) { return -261.3 / (d - 261.3); }, function(d) { return 261.3 - (261.3 / d); }],
    "plato"   : [function(d) { return -260.0 / (d - 260.0); }, function(d) { return 260.0 - (260.0 / d); }],
    "baume"   : [function(d) { return -145.0 / (d - 145.0); }, function(d) { return 145.0 - (145.0 / d); }]
  },
  "distance": {
    "meter": 1.0, "metres": 1.0, "meters": 1.0, "m": 1.0,
    "fermi": parseFloat('1.0e-15'), "fermis": parseFloat('1.0e-15'),
    "micron": parseFloat('1.0e-6'), "microns": parseFloat('1.0e-6'),
    "chain": 20.1168, "chains": 20.1168,
    "inch": parseFloat('25.4e-3'), "inches": parseFloat('25.4e-3'), "in": parseFloat('25.4e-3'),
    "microinch": parseFloat('2.54e-8'), "microinches": parseFloat('2.54e-8'),
    "mil": parseFloat('2.54e-05'), "mils": parseFloat('2.54e-05'),
    "rod": 5.029210, "rods": 5.029210,
    "league": 5556, "leagues": 5556,
    "foot": 0.3048, "feet": 0.3048, "ft": 0.3048,
    "yard": 0.9144, "yards": 0.9144, "yd": 0.9144,
    "mile": 1609.344, "miles": 1609.344, "mi": 1609.344,
    "astronomical_unit": parseFloat('149.60e+9'), "astronomical_units": parseFloat('149.60e+9'), "au": parseFloat('149.60e+9'), "ua": parseFloat('149.60e+9'),
    "light_year": parseFloat('9.461e+15'), "light_years": parseFloat('9.461e+15'), "ly": parseFloat('9.461e+15'),
    "parsec": parseFloat('30.857e+15'), "parsecs": parseFloat('30.857e+15'),
    "nautical_mile": 1852.0, "nautical_miles": 1852.0,
    "admirality_mile": 185.3184, "admirality_miles": 185.3184,
    "fathom": 1.8288, "fathoms": 1.8288,
    "cable_length": 185.2, "cable_lengths": 185.2,
    "angstrom": parseFloat('100.0e-12'), "angstroms": parseFloat('100.0e-12'),
    "pica": parseFloat('4.233333e-3'), "picas": parseFloat('4.233333e-3'),
    "printer_pica": parseFloat('4.217518e-3'), "printer_picas": parseFloat('4.217518e-3'),
    "point": parseFloat('3.527778e-4'), "points": parseFloat('3.527778e-4'),
    "printer_point": parseFloat('3.514598e-4'), "printer_points": parseFloat('3.514598e-4'),
    // unusual mesaurements
    "empire_state_building": 449.0, "empire_state_buildings": 449.0,
    "sears_tower": 519.0, "sears_towers": 519.0,
    "seattle_space_needle": 184.0, "seattle_space_needles": 184.0, "space_needle": 184.0, "space_needles": 184.0,
    "statue_of_liberty": 46.0, "statue_of_liberties": 46.0,
    "washington_monument": 169.294, "washington_monuments": 169.294,
    "eiffel_tower": 324.0, "eiffel_towers": 324.0,
    "nelsons_column": 61.5, "nelsons_columns": 61.5,
    "blackpool_tower": 158.0, "blackpool_towers": 158.0,
    "big_ben": 96.3, "big_bens": 96.3, "clock_tower_of_the_palace_of_westminster": 96.3, "clock_towers_of_the_palace_of_westminster": 96.3,
    "st_pauls_cathedral": 108.0, "st_pauls_cathedrals": 108.0,
    "toronto_cn_tower": 553.0, "toronto_cn_towers": 553.0, "cn_tower": 553.0, "cn_towers": 553.0,
    "circle_of_the_earth": 40075016.686, "equator": 40075016.686, "circles_of_the_earth": 40075016.686, "equators": 40075016.686,
    "siriometer": parseFloat('1.494838e+17'), "siriometers": parseFloat('1.494838e+17'),
    "football_field": 91.0, "football_fields": 91.0,
    "length_of_a_double_decker_bus": 8.4, "height_of_a_double_decker_bus": 4.4,
    "smoot": 1.7018, "smoots": 1.7018
  },
  "dose_equivalent": {
    "sievert": 1.0, "sieverts": 1.0, "Si": 1.0,
    "rem": parseFloat('1.0e-2'), "rems": parseFloat('1.0e-2')
  },
  "electric_charge": {
    "coulomb": 1.0, "coulombs": 1.0, "C": 1.0,
    "abcoulomb": 10.0, "abcoulombs": 10.0,
    "ampere_hour": parseFloat('3.6e+3'), "ampere_hours": parseFloat('3.6e+3'),
    "faraday": parseFloat('9.648534e+4'), "faradays": parseFloat('9.648534e+4'),
    "franklin": parseFloat('3.335641e-10'), "franklins": parseFloat('3.335641e-10'), "Fr": parseFloat('3.335641e-10'),
    "statcoulomb": parseFloat('3.335641e-10'), "statcoulombs": parseFloat('3.335641e-10')
  },
  "electric_conductance": {
    "siemen": 1.0, "siemens": 1.0, "S": 1.0, "mho": 1.0,
    "abmho": parseFloat('1.0e+9'), "absiemen": parseFloat('1.0e+9'), "absiemens": parseFloat('1.0e+9'),
    "statmho": parseFloat('1.112650e-12'), "statsiemen": parseFloat('1.112650e-12'), "statsiemens": parseFloat('1.112650e-12')
  },
  "electrical_impedance": {
    "ohm": 1.0, "ohms": 1.0,
    "abohm": parseFloat('1.0e-9'), "emu_of_resistance": parseFloat('1.0e-9'), "abohms": parseFloat('1.0e-9'), "emus_of_resistance": parseFloat('1.0e-9'),
    "statohm": parseFloat('8.987552e+11'), "esu_of_resistance": parseFloat('8.987552e+11'), "statohms": parseFloat('8.987552e+11'), "esus_of_resistance": parseFloat('8.987552e+11')
  },
  "electromotive_force": {
    "volt": 1.0, "volts": 1.0, "V": 1.0,
    "abvolt": parseFloat('1.0e-8'), "emu_of_electric_potential": parseFloat('1.0e-8'), "abvolts": parseFloat('1.0e-8'), "emus_of_electric_potential": parseFloat('1.0e-8'),
    "statvolt": parseFloat('2.997925e+2'), "esu_of_electric_potential": parseFloat('2.997925e+2'), "statvolts": parseFloat('2.997925e+2'), "esus_of_electric_potential": parseFloat('2.997925e+2')
  },
  "energy": {
    "joule": 1.0, "joules": 1.0, "J": 1.0, "watt_second": 1.0, "watt_seconds": 1.0,
    "watt_hour": parseFloat('3.6e+3'), "watt_hours": parseFloat('3.6e+3'),
    "ton_of_tnt": parseFloat('4.184e+9'), "tons_of_tnt": parseFloat('4.184e+9'),
    "therm": parseFloat('1.05506e+8'), "therms": parseFloat('1.05506e+8'),
    "us_therm": parseFloat('1.054804e+8'), "us_therms": parseFloat('1.054804e+8'),
    "kilowatt_hour": parseFloat('3.6e+6'), "kilowatt_hours": parseFloat('3.6e+6'),
    "kilocalorie": 4184.0, "kilocalories": 4184.0,
    "calorie": 4.184, "calories": 4.184,
    "mean_kilocalorie": 4190, "mean_kilocalories": 4190,
    "mean_calorie": 4.190, "mean_calories": 4.190,
    "it_kilocalorie": 4186.8, "it_kilocalories": 4186.8,
    "it_calorie": 4.1868, "it_calories": 4.1868,
    "foot_poundal": parseFloat('4.214011e-2'), "foot_poundals": parseFloat('4.214011e-2'),
    "foot_pound_force": 1.355818,
    "erg":  parseFloat('1.0e-7'), "ergs":  parseFloat('1.0e-7'),
    "electronvolt": parseFloat('1.602176e-19'), "electronvolts": parseFloat('1.602176e-19'), "eV": parseFloat('1.602176e-19'),
    "british_thermal_unit": parseFloat('1.054350e+3'), "british_thermal_units": parseFloat('1.054350e+3'),
    "mean_british_thermal_unit": parseFloat('1.05587e+3'), "mean_british_thermal_units": parseFloat('1.05587e+3'),
    "it_british_thermal_unit": parseFloat('1.055056e+3'), "it_british_thermal_units": parseFloat('1.055056e+3'),
    // unusual measurements
    "foe": 1e+44, "foes": 1e+44
  },
  "force": {
    "newton": 1.0, "newtons": 1.0, "N": 1.0,
    "dyne": parseFloat('1.0e-5'), "dynes": parseFloat('1.0e-5'), "dyn": parseFloat('1.0e-5'),
    "kilogram_force": 9.80665, "kgf": 9.80665, "kilopond": 9.80665, "kiloponds": 9.80665, "kp": 9.80665,
    "kip": parseFloat('4.448222e+3'), "kips": parseFloat('4.448222e+3'),
    "ounce_force": parseFloat('2.780139e-1'), "ozf": parseFloat('2.780139e-1'),
    "poundal": parseFloat('1.382550e-1'), "poundals": parseFloat('1.382550e-1'),
    "pound_force": 4.448222, "lbf": 4.448222,
    "ton_force": parseFloat('8.896443e+3')
  },
  "illuminance": {
    "lux": 1.0, "lx": 1.0, "lumens_per_square_metre": 1.0, "lumens_per_square_meter": 1.0, "lumen_per_square_metre": 1.0, "lumen_per_square_meter": 1.0,
    "phot": parseFloat('1.0e+4'), "phots": parseFloat('1.0e+4'), "ph": parseFloat('1.0e+4'),
    "lumens_per_square_foot": 10.76391, "footcandle": 10.76391, "lumen_per_square_foot": 10.76391, "footcandles": 10.76391
  },
 "inductance": {
    "henry": 1.0, "henrys": 1.0, "H": 1.0,
    "abhenrys": parseFloat('1.0e-9'), "emus_of_inductance": parseFloat('1.0e-9'), "abhenry": parseFloat('1.0e-9'), "emu_of_inductance": parseFloat('1.0e-9'),
    "stathenrys": parseFloat('8.987552e+11'), "esus_of_inductance": parseFloat('8.987552e+11'), "stathenry": parseFloat('8.987552e+11'), "esu_of_inductance": parseFloat('8.987552e+11')
  },
  "information_storage": {
    "bit": 1.0, "bits": 1.0, "b": 1.0,
    "byte": 8.0, "bytes": 8.0, "B": 8.0,
    "nibbles": 4.0, "nybbles": 4.0
  },
  "luminous_flux": {
    "lumen": 1.0, "lumens": 1.0, "lm": 1.0
  },
  "luminous_intensity": {
    "candela": 1.0, "candelas": 1.0, "cd": 1.0
  },
  "magnetic_flux": {
    "webers": 1.0, "Wb": 1.0,
    "maxwells": parseFloat('1.0e-8'), "Mx": parseFloat('1.0e-8'),
    "unit_poles": parseFloat('1.256637e-7')
  },
  "magnetic_inductance": {
    "tesla": 1.0, "teslas": 1.0, "T": 1.0,
    "gamma": parseFloat('1.0e-9'), "gammas": parseFloat('1.0e-9'),
    "gauss": parseFloat('1.0e-4'), "Gs": parseFloat('1.0e-4'), "G": parseFloat('1.0e-4')
  },
  "mass": {
    "gram": 1.0, "gramme": 1.0, "grams": 1.0, "grammes": 1.0, "g": 1.0,
    "carat": parseFloat('2.0e-1'), "carats": parseFloat('2.0e-1'),
    "ounce": parseFloat('2.834952e+1'), "ounces": parseFloat('2.834952e+1'), "oz": parseFloat('2.834952e+1'),
    "pennyweight": 1.555174, "pennyweights": 1.555174, "dwt": 1.555174,
    "pound": 453.59237, "pounds": 453.59237, "lb": 453.59237, "lbs": 453.59237,
    "troy_pound": 373.2417, "apothecary_pound": 373.2417, "troy_pounds": 373.2417, "apothecary_pounds": 373.2417,
    "slug": 14593.9029, "slugs": 14593.9029,
    "assay_ton": 29.1667, "assay_tons": 29.1667, "AT": 29.1667,
    "metric_ton": 1000000, "metric_tons": 1000000,
    "ton": 907184.74, "tons": 907184.74, "short_tons": 907184.74,
    // unusual measurements
    "elephant": 5443108.44, "elephants": 5443108.44
  },
  "power": {
    "watt": 1.0, "watts": 1.0, "W": 1.0,
    "british_thermal_unit_per_hour": parseFloat('2.928751e-1'), "british_thermal_units_per_hour": parseFloat('2.928751e-1'),
    "it_british_thermal_unit_per_hour": parseFloat('2.930711e-1'), "it_british_thermal_units_per_hour": parseFloat('2.930711e-1'),
    "british_thermal_unit_per_second": parseFloat('1.054350e+3'), "british_thermal_units_per_second": parseFloat('1.054350e+3'),
    "it_british_thermal_unit_per_second": parseFloat('1.055056e+3'), "it_british_thermal_units_per_second": parseFloat('1.055056e+3'),
    "calorie_per_minute": parseFloat('6.973333e-2'), "calories_per_minute": parseFloat('6.973333e-2'),
    "calorie_per_second": 4.184, "calories_per_second": 4.184,
    "erg_per_second": parseFloat('1.0e-7'), "ergs_per_second": parseFloat('1.0e-7'),
    "foot_pound_force_per_hour": parseFloat('3.766161e-4'),
    "foot_pound_force_per_minute": parseFloat('2.259697e-2'),
    "foot_pound_force_per_second": 1.355818,
    "horsepower": parseFloat('7.456999e+2'),
    "boiler_horsepower": parseFloat('9.80950e+3'),
    "electric_horsepower": parseFloat('7.46e+2'),
    "metric_horsepower": parseFloat('7.354988e+2'),
    "uk_horsepower": parseFloat('7.4570e+2'),
    "water_horsepower": parseFloat('7.46043e+2'),
    "kilocalorie_per_minute": 6.973333*10, "kilocalories_per_minute": 6.973333*10,
    "kilocalorie_per_second": parseFloat('4.184e+3'), "kilocalories_per_second": parseFloat('4.184e+3'),
    "ton_of_refrigeration": parseFloat('3.516853e+3'), "tons_of_refrigeration": parseFloat('3.516853e+3')
  },
  "pressure": {
    "pascal": 1.0, "pascals": 1.0, "Pa": 1.0,
    "atmosphere": parseFloat('1.01325e+5'), "atmospheres": parseFloat('1.01325e+5'),
    "technical_atmosphere": parseFloat('9.80665e+4'), "technical_atmospheres": parseFloat('9.80665e+4'),
    "bar": parseFloat('1.0e+5'), "bars": parseFloat('1.0e+5'),
    "centimeter_of_mercury": parseFloat('1.333224e+3'), "centimeters_of_mercury": parseFloat('1.333224e+3'),
    "centimeter_of_water": 98.0665, "centimeters_of_water": 98.0665, "gram_force_per_square_centimeter": 98.0665,
    "dyne_per_square_centimeter": parseFloat('1.0e-1'), "dynes_per_square_centimeter": parseFloat('1.0e-1'),
    "foot_of_mercury": parseFloat('4.063666e+4'), "feet_of_mercury": parseFloat('4.063666e+4'),
    "foot_of_water": parseFloat('2.989067e+3'), "feet_of_water": parseFloat('2.989067e+3'),
    "inch_of_mercury": parseFloat('3.386389e+3'), "inches_of_mercury": parseFloat('3.386389e+3'),
    "inch_of_water":  parseFloat('2.490889e+2'), "inches_of_water":  parseFloat('2.490889e+2'),
    "kilogram_force_per_square_centimeter": parseFloat('9.80665e+4'),
    "kilogram_force_per_square_meter": 9.80665,
    "kilogram_force_per_square_millimeter":  parseFloat('9.80665e+6'),
    "kip_per_square_inch": parseFloat('6.894757e+6'), "kips_per_square_inch": parseFloat('6.894757e+6'), "ksi": parseFloat('6.894757e+6'),
    "millibar": parseFloat('1.0e+2'), "mbar": parseFloat('1.0e+2'), "millibars": parseFloat('1.0e+2'), "mbars": parseFloat('1.0e+2'),
    "millimeter_of_mercury": parseFloat('1.333224e+2'), "millimeters_of_mercury": parseFloat('1.333224e+2'),
    "millimeter_of_water": 9.80665, "millimeters_of_water": 9.80665,
    "poundal_per_square_foot": 1.488164, "poundals_per_square_foot": 1.488164,
    "pound_force_per_square_foot": 47.88026,
    "pound_force_per_square_inch": parseFloat('6.894757e+3'), "psi": parseFloat('6.894757e+3'),
    "torr": parseFloat('1.333224e+2'), "torrs": parseFloat('1.333224e+2')
  },
  "radioactivity": {
    "becquerel": 1.0, "becquerels": 1.0, "Bq": 1.0,
    "curie": parseFloat('3.7e+10'), "curies": parseFloat('3.7e+10'), "Ci": parseFloat('3.7e+10')
  },
  "temperature": {
    "kelvin": 1.0, "K": 1.0,
    
    "celsius": [function(t) { return t + 273.15 }, function(t) { return t - 273.15 }], "centrigrade": [function(t) { return t + 273.15 }, function(t) { return t - 273.15 }],
    "degree_celsius": [function(t) { return t + 273.15 }, function(t) { return t - 273.15 }], "degree_centrigrade": [function(t) { return t + 273.15 }, function(t) { return t - 273.15 }],
    "degrees_celsius": [function(t) { return t + 273.15 }, function(t) { return t - 273.15 }], "degrees_centrigrade": [function(t) { return t + 273.15 }, function(t) { return t - 273.15 }],
    "fahrenheit": [function(t) { return (t + 459.67) * (5.0/9.0) }, function(t) { return t * (9.0/5.0) - 459.67 }],
    "degree_fahrenheit": [function(t) { return (t + 459.67) * (5.0/9.0) }, function(t) { return t * (9.0/5.0) - 459.67 }],
    "degrees_fahrenheit": [function(t) { return (t + 459.67) * (5.0/9.0) }, function(t) { return t * (9.0/5.0) - 459.67 }],
    "rankine": 1.8, "rankines": 1.8
  }, 
  "time": {
    "second": 1.0, "seconds": 1.0, "s": 1.0,
    "minute": 60.0, "minutes": 60.0, "min": 60.0,
    "sidereal_minute": 5.983617, "sidereal_minutes": 5.983617,
    "hour": 3600.0, "hours": 3600.0, "hr": 3600.0, "h": 3600.0,
    "sidereal_hour": parseFloat('3.590170e+3'), "sidereal_hours": parseFloat('3.590170e+3'),
    "day": 86400.0, "days": 86400.0,
    "sidereal_day": parseFloat('8.616409e+4'), "sidereal_days": parseFloat('8.616409e+4'),
    "shake": parseFloat('1.0e-8'), "shakes": parseFloat('1.0e-8'),
    "year": parseFloat('3.1536e+7'), "years": parseFloat('3.1536e+7'),
    "sidereal_year": parseFloat('3.155815e+7'), "sidereal_years": parseFloat('3.155815e+7'),
    "tropical_year": parseFloat('3.155693e+7'), "tropical_years": parseFloat('3.155693e+7'),
    // unusual measurements
    "jiffy": 0.01, "jiffies": 0.01,
    "microfortnight": 1.2096, "microfortnights": 1.2096,
    "megaannum": parseFloat('3.1536e+16'), "Ma": parseFloat('3.1536e+16'), "megaannums": parseFloat('3.1536e+16'),
    "galactic_year": parseFloat('7.884e+18'), "galactic_years": parseFloat('7.884e+18'), "GY": parseFloat('7.884e+18')
  },
  "volume": {
    "litre": 1.0, "liter": 1.0, "litres": 1.0, "liters": 1.0, "l": 1.0, "L": 1.0,
    "barrel": parseFloat('1.589873e+2'), "barrels": parseFloat('1.589873e+2'),
    "bushel": parseFloat('3.523907e+1'), "bushels": parseFloat('3.523907e+1'),
    "cubic_meter": 1000.0, "cubic_meters": 1000.0,
    "cup": parseFloat('2.365882e-1'), "cups": parseFloat('2.365882e-1'),
    "imperial_fluid_ounce": 0.0284130742, "imperial_fluid_ounces": 0.0284130742,
    "ounce": 0.0295735296, "ounces": 0.0295735296, "fluid_ounce": 0.0295735296, "fluid_ounces": 0.0295735296,
    "imperial_gallon": 4.54609, "imperial_gallons": 4.54609,
    "gallon": 3.785412, "gallons": 3.785412, "gals": 3.785412, "Gals": 3.785412,
    "imperial_gill": parseFloat('1.420653e-1'), "imperial_gills": parseFloat('1.420653e-1'),
    "gill": parseFloat('1.182941e-1'), "gills": parseFloat('1.182941e-1'), "gi": parseFloat('1.182941e-1'),
    "pint": parseFloat('5.506105e-1'), "pints": parseFloat('5.506105e-1'),
    "liquid_pint": parseFloat('4.731765e-1'), "liquid_pints": parseFloat('4.731765e-1'),
    "quart": 1.101221, "quarts": 1.101221,
    "liquid_quart": parseFloat('9.463529e-1'), "liquid_quarts": parseFloat('9.463529e-1'),
    "tablespoon": 0.0147867648, "tablespoons": 0.0147867648,
    "teaspoon": 0.00492892159, "teaspoons": 0.00492892159,
    // unusual measurements
    "sydharb": parseFloat('5.0e+11'), "sydharbs": parseFloat('5.0e+11')
  }
}

Alchemist.unitPrefixes = {
  "googol": parseFloat('1e+100'),
  "yotta": parseFloat('1e+24'), "Y": parseFloat('1e+24'),
  "zetta": parseFloat('1e+21'), "Z": parseFloat('1e+21'),
  "exa": parseFloat('1e+18'), "E": parseFloat('1e+18'),
  "peta": parseFloat('1e+15'), "P": parseFloat('1e+15'),
  "tera": parseFloat('1e+12'), "T": parseFloat('1e+12'),
  "giga": parseFloat('1e+9'), "G": parseFloat('1e+9'),
  "mega": parseFloat('1e+6'), "M": parseFloat('1e+6'),
  "kilo": parseFloat('1e+3'), "k": parseFloat('1e+3'),
  "hecto": parseFloat('1e+2'), "h": parseFloat('1e+2'),
  "deca": 10, "da": 10,
  "deci": parseFloat('1e-1'), "d": parseFloat('1e-1'),
  "centi": parseFloat('1e-2'), "c": parseFloat('1e-2'),
  "milli": parseFloat('1e-3'), "m": parseFloat('1e-3'),
  "micro": parseFloat('1e-6'), "u": parseFloat('1e-6'),
  "nano": parseFloat('1e-9'), "n": parseFloat('1e-9'),
  "pico": parseFloat('1e-12'), "p": parseFloat('1e-12'),
  "femto": parseFloat('1e-15'), "f": parseFloat('1e-15'),
  "atto": parseFloat('1e-18'), "a": parseFloat('1e-18'),
  "zepto": parseFloat('1e-21'), "z": parseFloat('1e-21'),
  "yocto": parseFloat('1e-24'), "y": parseFloat('1e-24'),
  
  // binary prefixes
  
  "kibi": Math.pow(2.0, 10.0), "Ki": Math.pow(2.0, 10.0),
  "mebi": Math.pow(2.0, 20.0), "Mi": Math.pow(2.0, 20.0),
  "gibi": Math.pow(2.0, 30.0), "Gi": Math.pow(2.0, 30.0),
  "tebi": Math.pow(2.0, 40.0), "Ti": Math.pow(2.0, 40.0),
  "pebi": Math.pow(2.0, 50.0), "Pi": Math.pow(2.0, 50.0),
  "exbi": Math.pow(2.0, 60.0), "Ei": Math.pow(2.0, 60.0),
  "zebi": Math.pow(2.0, 70.0), "Zi": Math.pow(2.0, 70.0),
  "yobi": Math.pow(2.0, 80.0), "Yi": Math.pow(2.0, 80.0)
};

Alchemist.conversions = {};

Alchemist.register = function(type, names, value) {
  if(!(names instanceof Array)) names = [names];
  _.each(names, function(name) {
    Alchemist.conversions[name] = Alchemist.conversions[name] || [];
    Alchemist.conversions[name].push(type);
    Alchemist.conversionTable[type][name] = value;
  });
};

Alchemist.register_operation_conversions = function(type, other_type, operation, converted_type) {
  Alchemist.operatorActions[operation] = Alchemist.operatorActions[operation] || []
  Alchemist.operatorActions[operation] << [type, other_type, converted_type]
};

Alchemist.parsePrefix = function(prefixedUnit) {
  var prefixData;
  _.each(Alchemist.unitPrefixes, function(value, prefix) {
    var prefixExp = new RegExp('^' + prefix),
        unit = Alchemist.longForm(prefixedUnit.replace(prefixExp,'')),
        unitMatches = prefixedUnit.match(new RegExp('^' + prefix + '.+')),
        isSIUnit = unitMatches && _.find(Alchemist.siUnits, function(siUnit) {
          return siUnit == unit;
        });
    if(isSIUnit) {
      if(_.find(Alchemist.conversions[unit], function(c) { return c == 'information_storage'; }) &&
         !Alchemist.useSI && value >= 1000) {
        value = Math.pow(2, (10 * (Math.log(value) / Math.log(10)) / 3));
      }
      prefixData = { exponent: value, unit: unit };
    }
  });
  return prefixData || { exponent: 1.0, unit: prefixedUnit };
};

_.each(Alchemist.conversionTable, function(conversions, type) {
  _.each(conversions, function(value, name) {
    Alchemist.conversions[name] = Alchemist.conversions[name] || [];
    Alchemist.conversions[name].push(type);
  });
});

module.exports = Alchemist;
