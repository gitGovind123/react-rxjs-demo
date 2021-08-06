import React ,{ useState, useEffect } from 'react'
import { Observable, of, combineLatest } from 'rxjs'
import { map, timeout } from 'rxjs/operators'

import Styles from './main.module.css'

const Main = () => {
    const [latestSensorData, setLatestSensorData] = useState([])

    useEffect(() => {
        const sensor1 = new Observable((obsr) => {
            setInterval(() => {
                obsr.next((Math.random()*100).toFixed(2))
            }, Math.random() * (1500 - 200) + 200)
        })

        const sensor2 = new Observable((obsr) => {
            setInterval(() => {
                obsr.next((Math.random()*100).toFixed(2))
            }, Math.random() * (1500 - 300) + 300)
        })

        const sensor3 = new Observable((obsr) => {
            setInterval(() => {
                obsr.next((Math.random()*100).toFixed(2))
            }, Math.random() * (1500 - 400) + 400)
        })

        const sensor4 = new Observable((obsr) => {
            setInterval(() => {
                obsr.next((Math.random()*100).toFixed(2))
            }, Math.random() * (1500 - 800) + 800)
        })

        if(sensor1 || sensor2 || sensor3 || sensor4) {
           combineLatest([
               sensor1.pipe(timeout({each: 1300, with: () => of('No Data')})),
               sensor2.pipe(timeout({each: 1300, with: () => of('No Data')})),
               sensor3.pipe(timeout({each: 1300, with: () => of('No Data')})),
               sensor4.pipe(timeout({each: 1300, with: () => of('No Data')}))
           ])
                .pipe(
                    map(([s1, s2, s3, s4]) => {
                            return {
                                A: s1,
                                B: s2,
                                C: s3,
                                D: s4
                            };
                        }
                    )
                )
                .subscribe((x) => {
                    setLatestSensorData(x)
                })
        }
    },[])

    return(
        <div className={`container mt-3 ${Styles.main_container}`} data-testid='main_comp'>
            <h5> RXJS demo with react</h5>
            <div className='row mt-4'>
                <div className='col-md-3'>
                    <div className={Styles.card_section}>
                        <span className={Styles.icon_box}>A</span>
                        <p className={Styles.card_content}>
                            {
                                latestSensorData &&
                                latestSensorData.A
                            }
                        </p>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className={Styles.card_section}>
                        <span className={Styles.icon_box}>B</span>
                        <p className={Styles.card_content}>
                            {
                                latestSensorData &&
                                latestSensorData.B
                            }
                        </p>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className={Styles.card_section}>
                        <span className={Styles.icon_box}>C</span>
                        <p className={Styles.card_content}>
                            {
                                latestSensorData &&
                                latestSensorData.C
                            }
                        </p>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className={Styles.card_section}>
                        <span className={Styles.icon_box}>D</span>
                        <p className={Styles.card_content}>
                            {
                                latestSensorData &&
                                latestSensorData.D
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main