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
import { abbrNum } from "../utils";

export const VolStats = ({volume, volumeChange, rank}) => {
  const types = [
    ['total', 'allTime'],
    ['1 day', '1day'],
    ['7 days', '7day'],
    ['30 days', '30day'],
  ]

  return <StatGroup >
    {types.map(([label, type]) => (
      <VolStat
        key={type}
        label={label}
        value={abbrNum(volume[type])}
        rank={rank[type]}
        volumeChange={type === 'allTime' ? null : volumeChange[type]}
      />
    ))}
  </StatGroup>
}


const VolStat = ({label, value, rank, volumeChange}) => {
  return <Stat>

    <StatLabel>{label}</StatLabel>

    <StatNumber>
      <Icon mr={1} boxSize="4" as={FaEthereum} />
      {value}
    </StatNumber>


    {volumeChange && <StatHelpText>
      <StatArrow type={volumeChange >= 1 ? 'increase' : 'decrease'} />
      {((volumeChange - 1) * 100).toFixed()}%
    </StatHelpText>}
    
    { rank && 
      <StatHelpText>
        rank #{rank}
      </StatHelpText>  
    }
  </Stat>
}