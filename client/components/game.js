import React from 'react'
import { useRouter } from 'next/router'
import useInterval from 'use-interval'
import { Info, palette, VSpace } from '@ambler/andive'
import styled, { css } from 'styled-components'
import useDimensions from 'react-use-dimensions'

import { useGame } from '../lib/api'
import { AppRow, AppCol } from './responsive'

const range = n => (n ? [...new Array(n).keys()] : [])

const GameRoot = styled.div`
  border: 2px solid ${palette.darkGrey};
  border-radius: 6px;
  overflow: hidden;
`
const HeaderRow = styled(AppRow)`
  background: #eee;
`
const HeaderCol = styled(AppCol)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Map = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 32px 0;
`

const Tooltip = styled.div`
  display: none;

  position: absolute;
  left: 0;
  bottom: calc(100% + 8px);

  width: 200px;

  background: black;
  color: white;
  border-radius: 4px;
  padding: 4px;

  z-index: 2;
`

const TooltipLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

function CastleTooltip({ castle }) {
  const {
    stats: { hp_cur, hp_max }
  } = castle

  return (
    <Tooltip>
      <TooltipLayout>
        <div>Castle</div>
        <div>❤️ {hp_cur + '/' + hp_max}</div>
      </TooltipLayout>
    </Tooltip>
  )
}

function UnitTooltip({ unit }) {
  const {
    stats: { hp_cur, hp_max, def, mov, str, rng },
    type
  } = unit

  return (
    <Tooltip>
      <TooltipLayout>
        <div>{type}</div>
        <div>❤️ {hp_cur + '/' + hp_max}</div>
        <div>🛡 {def}</div>
        <div>🦶 {mov}</div>
        <div>⚔️ {str}</div>
        <div>🏹 {rng}</div>
      </TooltipLayout>
    </Tooltip>
  )
}

const Tile = styled.div`
  margin-right: 1px;
  position: relative;

  :hover {
    ${Tooltip} {
      display: block;
    }
  }

  ${props =>
    props.player &&
    css`
      ::after {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        width: 100%;
        height: 100%;
        background: ${palette.hexToRGBA(props.player === 1 ? '#1dbeff' : '#f98c9d', 0.5)};
        z-index: 1;
      }
    `}
`

const mockUnits = [
  {
    player: 1,
    pos: {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    },
    stats: {
      hp_cur: 2,
      hp_max: 3,
      rng: 1,
      def: 0,
      mov: 3,
      str: 2
    },
    type: 'water',
    active: true
  },
  {
    player: 1,
    pos: {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    },
    stats: {
      hp_cur: 2,
      hp_max: 3,
      rng: 1,
      def: 0,
      mov: 3,
      str: 2
    },
    type: 'fire',
    active: true
  },
  {
    player: 1,
    pos: {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    },
    stats: {
      hp_cur: 2,
      hp_max: 3,
      rng: 1,
      def: 0,
      mov: 3,
      str: 2
    },
    type: 'earth',
    active: false
  }
]

const castlesMock = [
  {
    player: 2,
    pos: {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    },
    stats: {
      hp_cur: 5,
      hp_max: 20
    },
    active: true
  },
  {
    player: 1,
    pos: {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    },
    stats: {
      hp_cur: 5,
      hp_max: 20
    },
    active: true
  }
]

export function Game({ id }) {
  const { data, loading, error, refetch } = useGame(id)
  const router = useRouter()

  const [map, setMap] = React.useState({
    size: 0,
    units: [],
    castles: []
  })
  const [turn, setTurn] = React.useState(0)

  const [gameStatus, setGameStatus] = React.useState('pending')
  const [mapRef, { width }] = useDimensions()

  React.useEffect(() => {
    if (!data || data.status === 'error') {
      return
    }

    setMap(data.map)
    setGameStatus(data.game)
    setTurn(data.turn)
  }, [data])

  useInterval(() => {
    refetch()
  }, 3000)

  const size = Math.min(width, 600) / 20 - 1

  return (
    <GameRoot>
      <HeaderRow>
        <HeaderCol>
          <Info>
            <Info.Item item="Size" />
            <Info.Label label={`${map.size}x${map.size}`} />
          </Info>
        </HeaderCol>
        <HeaderCol>
          <Info>
            <Info.Item item="Units" />
            <Info.Label label={map.units.length} />
          </Info>
        </HeaderCol>
        <HeaderCol>
          <Info>
            <Info.Item item="Turn" />
            <Info.Label label={turn} />
          </Info>
        </HeaderCol>
        <HeaderCol>
          <Info>
            <Info.Item item="Player" />
            <Info.Label label={map.playerTurn === router.query.player ? 'Your turn' : 'Wait...'} />
          </Info>
        </HeaderCol>
      </HeaderRow>
      <Map ref={mapRef}>
        {range(map.size).map(y => {
          return (
            <div key={y} style={{ display: 'flex', flexFlow: 'row nowrap', marginBottom: 1 }}>
              {range(map.size).map(x => {
                const unit = map.units.find(unit => unit.pos.x === x && unit.pos.y === y)
                const castle = map.castles.find(castle => castle.pos.x === x && castle.pos.y === y)
                const player = unit ? unit.player : null

                const backgroundImage = () => {
                  if (!unit) {
                    if (castle) {
                      return '/static/builds/castle.png'
                    }

                    return null
                  }

                  switch (unit.type) {
                    case 'water':
                      return '/static/units/water.png'
                    case 'fire':
                      return '/static/units/fire.png'
                    case 'earth':
                      return '/static/units/earth.png'
                  }

                  return null
                }

                return (
                  <Tile
                    key={x}
                    player={unit ? unit.player : castle ? castle.player : undefined}
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: '#e1e1e1',
                      backgroundImage: `url(${backgroundImage(unit)})`,
                      backgroundSize: `${size}px ${size}px`
                    }}
                  >
                    {castle ? <CastleTooltip castle={castle} /> : unit ? <UnitTooltip unit={unit} /> : null}
                  </Tile>
                )
              })}
            </div>
          )
        })}
      </Map>
    </GameRoot>
  )
}
