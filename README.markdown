# Alchemist

Doing conversions for you so you don't have to google them; making code more readable.  

Having code that looks like this is meaningless

    miles = 8 * 1609.344;

You could add comments

    miles = 8 * 1609.344; // converting meters to miles

But why not have this?

    var convert = require('alchemist').convert;
    
    convert(8, 'meters', 'miles');

Handling bytes conforms to the JEDEC memory standard

   convert(1, 'kb', 'b') == 1024.0;

To switch to the IEC memory standard, force SI units with

    Alchemist.use_si = true;

## Registering your own units

    Alchemist.register('distance', ['beard_second', 'beard_seconds'], 5, 'angstroms')


## Alchemist has conversions for:

### Distance

* metres or meters
* fermis
* microns
* chains
* inches
* microinches
* mils
* rods
* leagues
* feet
* yards
* miles
* astronomical_units
* light_years
* parsecs
* nautical_miles
* admirality_miles
* fathoms
* cable_lengths
* angstroms
* picas
* printer_picas
* points
* printer_points

### Mass

* grams or grammes
* carats
* ounces
* pennyweights
* pounds
* troy_pounds or apothecary_pounds
* slugs
* assay_tons
* metric_tons
* tons or short_tons

### Volume

* litres or liters
* barrels
* bushels
* cubic_meters
* cups
* imperial_fluid_ounces
* fluid_ounces
* imperial_gallons
* gallons
* imperial_gills
* gills
* pints
* liquid_pints
* quarts
* liquid_quarts
* tablespoons
* teaspoons

### And many more

Check out `lib/alchemist.js` for the rest.
