import React from 'react'
import { Pokemon } from '../../Types';


type PropsStats = Pokemon;

export const PokeStats:React.FC<PropsStats> = ({height, color, weight, stats}) => {

  return (
    <div
    className="w-auto text-center top-0 relative stats-circular-info"
  >
    <h2 className="text-xl">Stats</h2>
    <div
      style={{ backgroundColor: color }}
      className=" p-3 px-5  flex flex-col gap-2 text-xl"
    >
      <p>
        <> Height: {height}</>
      </p>
      <p>
        <> Weight: {weight}</>
      </p>
      <div className="flex flex-col gap-2">
        {stats.map(({ name, value }) => {
          return (
            <div key={name}>
              <p className="capitalize">
                {name}: {value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  )
}
