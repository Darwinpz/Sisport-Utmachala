import React from 'react'
import VerPortafolio from 'components/Portafolios/ver'


export default function PortafolioVer({params}) {

    const {asig_codigo, peri_codigo} = params

    return (
        <>
            <div className="row">

                <div className="col">

                    <VerPortafolio  asig_codigo={asig_codigo} peri_codigo={peri_codigo}/>

                </div>

            </div>

        </>
    )
}