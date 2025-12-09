import { bagsDTO } from '../schemas/productsSchema/bagsSchema.js';
import { boysBrandsDTO } from '../schemas/productsSchema/boysBrandsSchema.js';
import { boysWADTO } from '../schemas/productsSchema/boysWASchema.js';
import { girlsGrandsDTO } from '../schemas/productsSchema/girlsGrandsSchema.js';
import { girlsWADTO } from '../schemas/productsSchema/girlsWASchema.js';
import { luggageDTO } from '../schemas/productsSchema/luggageSchema.js';
import { mensBottomwearDTO } from '../schemas/productsSchema/menBottomWearSchema.js';
import { mensFootwearDTO } from '../schemas/productsSchema/menFootWearSchema.js';
import { mensWADTO } from '../schemas/productsSchema/mensWASchema.js';
import { mensTopwearDTO } from '../schemas/productsSchema/menTopWearSchema.js'; // adjust path as needed
import { suitcasesDTO } from '../schemas/productsSchema/suitcasesSchema.js';
import { womensEthnicDTO } from '../schemas/productsSchema/womenEthnicSchema.js';
import { womensFootwearDTO } from '../schemas/productsSchema/womenFootwearSchema.js';
import { womensWADTO } from '../schemas/productsSchema/womensWASchema.js';
import { womensWesternDTO } from '../schemas/productsSchema/womenWesternSchema.js';

const Schema_DTOs = {
  bgs: bagsDTO,
  bbds: boysBrandsDTO,
  bwa: boysWADTO,
  ggds: girlsGrandsDTO,
  gwa: girlsWADTO,
  lgs: luggageDTO,
  mbtr: mensBottomwearDTO,
  mfr: mensFootwearDTO,
  mwa: mensWADTO,
  mtr: mensTopwearDTO,
  sts: suitcasesDTO,
  weth: womensEthnicDTO,
  wftr: womensFootwearDTO,
  wwa: womensWADTO,
  wwtn: womensWesternDTO,
};

export default Schema_DTOs;
