import React from 'react'

type Props = {
    type: any
}

const Skeleton = (props: Props) => {

    const base = 'bg-[#ddd] rounded-[4px] animate-pulse flex'
    const className = `${base} ${props.type}`

  return (
    <div className={className}></div>
  )
}

export default Skeleton;