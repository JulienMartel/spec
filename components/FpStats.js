import { 
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import { useAppContext } from "../context/state";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

export const FpStats = ({floorSale, floorSaleChange, floorAsk}) => {
  const types = [
    ['1 day', '1day'],
    ['7 days', '7day'],
    ['30 days', '30day'],
  ]

  const { ethPrice } = useAppContext()
  
  return <StatGroup >
    <FpStat 
      label="current"
      value={floorAsk.price}
      usdVal={formatter.format(floorAsk.price * ethPrice || 0)}
    />
    {types.map(([label, type]) => (
      <FpStat
        key={type}
        label={label}
        value={floorSale[type]?.toFixed(2)}
        floorChange={floorSaleChange[type]}
      />
    ))}
  </StatGroup>
}


const FpStat = ({label, value, usdVal, floorChange}) => {
  return <Stat>
    <StatLabel>{label}</StatLabel>
    <StatNumber>
      <Icon mr={1} boxSize="4" as={FaEthereum} />
      {value || "—"}
    </StatNumber>
    <StatHelpText>
      {usdVal && usdVal}
      {floorChange && <>
        <StatArrow type={floorChange >= 1 ? 'increase' : 'decrease'} />
        {((floorChange - 1) * 100).toFixed()}%
      </>}
    </StatHelpText>
  </Stat>
}