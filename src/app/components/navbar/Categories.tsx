'use client';

import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FaUmbrellaBeach } from '@react-icons/all-files/fa/FaUmbrellaBeach';
import { GiCastle } from '@react-icons/all-files/gi/GiCastle';
import { GiForestCamp } from '@react-icons/all-files/gi/GiForestCamp';
import { GiBoatFishing } from '@react-icons/all-files/gi/GiBoatFishing';
import { GiCactus } from '@react-icons/all-files/gi/GiCactus';
import { GiBarn } from '@react-icons/all-files/gi/GiBarn';
import { GiIsland } from '@react-icons/all-files/gi/GiIsland';
import { GiCaveEntrance } from '@react-icons/all-files/gi/GiCaveEntrance';
import { GiMountainCave } from '@react-icons/all-files/gi/GiMountainCave';
import { GiVillage } from '@react-icons/all-files/gi/GiVillage';
import { GiWindmill } from '@react-icons/all-files/gi/GiWindmill';
import { SiInfluxdb } from '@react-icons/all-files/si/SiInfluxdb';
import { FaSkiing } from '@react-icons/all-files/fa/FaSkiing';
import { FaSwimmingPool } from '@react-icons/all-files/fa/FaSwimmingPool';
import { IoSnowOutline } from '@react-icons/all-files/io5/IoSnowOutline';

import Container from '@components/Container';
import CategoryBox from '@components/CategoryBox';

export const categories = [
  {
    label: 'Beach',
    icon: FaUmbrellaBeach,
    description: 'This property is closed to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property has windmills!',
  },
  {
    label: 'Modern',
    icon: GiVillage,
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    icon: GiMountainCave,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: FaSwimmingPool,
    description: 'This property has a pool!',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is close to a lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activities!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is in a castle!',
  },
  {
    label: 'Camp',
    icon: GiForestCamp,
    description: 'This property has camp activities!',
  },
  {
    label: 'Arctic',
    icon: IoSnowOutline,
    description: 'This property is in an arctic!',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This property is in a cave!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in a desert!',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in the barn!',
  },
  {
    label: 'Lux',
    icon: SiInfluxdb,
    description: 'This property is luxurious!',
  },
];

export const Categories = () => {
  const params = useSearchParams();

  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  const categoryParams = params?.get('category');

  return (
    <Container>
      <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded scrollbar-h-1 sm:pt-2">
        {categories.map(category => (
          <Suspense key={category.label}>
            <CategoryBox
              label={category.label}
              icon={category.icon}
              description={category.description}
              selected={categoryParams === category.label}
            />
          </Suspense>
        ))}
      </div>
    </Container>
  );
};
