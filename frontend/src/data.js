import {
  TbAirConditioning,
  TbGrill,
  TbIroningSteam,
  TbSnowflake,
  TbWashMachine,
} from "react-icons/tb";
import {
  GiBarn,
  GiBathtub,
  GiBoatFishing,
  GiCampCookingPot,
  GiDesert,
  GiFamilyHouse,
  GiFireplace,
  GiGasStove,
  GiHanger,
  GiIsland,
  GiMountainCave,
  GiPaperWindmill,
  GiRoyalLove,
  GiShower,
  GiSoap,
  GiTv,
  GiUndergroundCave,
  GiWashingMachine,
  GiWorld,
} from "react-icons/gi";
import { FaUmbrellaBeach, FaCampground, FaSkiingNordic } from "react-icons/fa";
import { FaPeopleGroup, FaCarTunnel } from "react-icons/fa6";
import { BiSolidCastle, BiFridge, BiCheck } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import {
  MdMicrowave,
  MdOutlineHolidayVillage,
  MdPool,
  MdOutlineSpaceDashboard,
  MdWifi,
  MdOutlineBalcony,
  MdOutlineYard,
} from "react-icons/md";
import {
  PiCampfire,
  PiDog,
  PiFireExtinguisherBold,
  PiFirstAid,
  PiPark,
} from "react-icons/pi";
import { GiCctvCamera } from "react-icons/gi";

export const categories = [
  {
    label: "All",
    icon: <GiWorld />,
  },
  {
    img: "assets/categories/beach-view.jpg",
    label: "Beachfront",
    icon: <FaUmbrellaBeach />,
    description: "This property is close to the beach!",
  },
  {
    img: "assets/categories/windmill.jpg",
    label: "Windmills",
    icon: <GiPaperWindmill />,
    description: "This property is has windmills!",
  },
  {
    img: "assets/categories/city.jpg",
    label: "Iconic cities",
    icon: <MdOutlineHolidayVillage />,
    description: "This property is modern!",
  },
  {
    img: "assets/categories/countryside.jpg",
    label: "Countryside",
    icon: <GiMountainCave />,
    description: "This property is in the countryside!",
  },
  {
    img: "assets/categories/pool.jpg",
    label: "Amazing Pools",
    icon: <MdPool />,
    description: "This is property has a beautiful pool!",
  },
  {
    img: "assets/categories/island.jpg",
    label: "Islands",
    icon: <GiIsland />,
    description: "This property is on an island!",
  },
  {
    img: "assets/categories/lake.jpg",
    label: "Lakefront",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    img: "assets/categories/luxury.jpg",
    label: "Luxury",
    icon: <GiRoyalLove />,
    description: "This property is brand new and luxurious!",
  },
  {
    img: "assets/categories/island.jpg",
    label: "Camping",
    icon: <FaCampground />,
    description: "This property offers camping activities!",
  },
  {
    img: "assets/categories/island.jpg",
    label: "Ski-in/out",
    icon: <FaSkiingNordic />,
    description: "This property has skiing activities!",
  },
  {
    img: "assets/categories/island.jpg",
    label: "Castles",
    icon: <BiSolidCastle />,
    description: "This property is an ancient castle!",
  },
  {
    img: "assets/categories/island.jpg",
    label: "Caves",
    icon: <GiUndergroundCave />,
    description: "This property is in a spooky cave!",
  },
  {
    img: "assets/categories/island.jpg",
    label: "Arctic",
    icon: <TbSnowflake />,
    description: "This property is in arctic environment!",
  },
  {
    img: "assets/categories/island.jpg",
    label: "Desert",
    icon: <GiDesert />,
    description: "This property is in the desert!",
  },
  {
    img: "assets/categories/island.jpg",
    label: "Barns",
    icon: <GiBarn />,
    description: "This property is in a barn!",
  },
];

export const types = [
  {
    id: 1,
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: <GiFamilyHouse />,
  },
  {
    id: 2,
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <IoBedOutline />,
  },
  {
    id: 3,
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: <FaPeopleGroup />,
  },
];

export const facilities = [
  {
    name: "Bath tub",
    icon: <GiBathtub />,
  },
  {
    name: "Personal care products",
    icon: <GiSoap />,
  },
  {
    name: "Outdoor shower",
    icon: <GiShower />,
  },
  {
    name: "Washer",
    icon: <GiWashingMachine />,
  },
  {
    name: "Dryer",
    icon: <TbWashMachine />,
  },
  {
    name: "Hangers",
    icon: <GiHanger />,
  },
  {
    name: "Iron",
    icon: <TbIroningSteam />,
  },
  {
    name: "TV",
    icon: <GiTv />,
  },
  {
    name: "Dedicated workspace",
    icon: <MdOutlineSpaceDashboard />,
  },
  {
    name: "Air Conditioning",
    icon: <TbAirConditioning />,
  },
  {
    name: "Heating",
    icon: <GiFireplace />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <PiFireExtinguisherBold />,
  },
  {
    name: "First Aid",
    icon: <PiFirstAid />,
  },
  {
    name: "Wifi",
    icon: <MdWifi />,
  },
  {
    name: "Cooking set",
    icon: <GiCampCookingPot />,
  },
  {
    name: "Refrigerator",
    icon: <BiFridge />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Stove",
    icon: <GiGasStove />,
  },
  {
    name: "Barbecue grill",
    icon: <TbGrill />,
  },
  {
    name: "Outdoor dining area",
    icon: <PiPark />,
  },
  {
    name: "Private patio or Balcony",
    icon: <MdOutlineBalcony />,
  },
  {
    name: "Camp fire",
    icon: <PiCampfire />,
  },
  {
    name: "Garden",
    icon: <MdOutlineYard />,
  },
  {
    name: "Free parking",
    icon: <FaCarTunnel />,
  },
  {
    name: "Self check-in",
    icon: <BiCheck />,
  },
  {
    name: " Pet allowed",
    icon: <PiDog />,
  },
];
