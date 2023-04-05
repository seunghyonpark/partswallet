'use client';
import Image from 'next/image'
import { Inter } from 'next/font/google'

////import styles from './page.module.css'

import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';




export default function Chart(props: any) {



  const [chartData, setChartData] = useState<any>();

  const [options, setOptions] = useState<any>();


  


  useEffect(() => {



    const staticData = [] as any;
  
    (async () => {
      const response = await axios.get('https://dapi.binance.com/dapi/v1/klines?symbol=ETHUSD_PERP&interval=1m&startTime=1680113606000');
      
      
      response.data.forEach( (el: any) => {
        staticData.push([el[0],parseFloat(el[1]),parseFloat(el[2]),parseFloat(el[3]),parseFloat(el[4]),parseInt(el[5])])
      })

    })()

    console.log("staticData", staticData);

    setChartData(staticData);


    const options = {
      rangeSelector: {
        selected: 1
      },
  
      accessibility: {
        enabled: true
      },
  
      /*
      title: {
        text: "AAPL Historical"
      },
      */
      chart: {
        backgroundColor: '#000000',
     },
  
      yAxis: [
        {
          labels: {
            align: "right",
            x: -3
          },
          title: {
            text: "ETH-USD"
          },
          height: "100%",
          lineWidth: 2,
          resize: {
            enabled: true
          }
        },
  
      ],
  
      tooltip: {
        split: true
      },
  
      series: [
        {
          type: "candlestick",
          name: "ETH-USD",
          data: chartData,
          //data: ohlc,
          /*
          dataGrouping: {
            units: groupingUnits
          }
          */
        },
  
      ]
    };

    setOptions(options);



  
    let i = 0;
  
    function pollDOM() {
      console.log(i);
      i++;
  
  
      const staticData = [] as any;
  
      (async () => {
        const response = await axios.get('https://dapi.binance.com/dapi/v1/klines?symbol=ETHUSD_PERP&interval=1m&startTime=1680113606000');
        
        
        response.data.forEach( (el: any) => {
          staticData.push([el[0],parseFloat(el[1]),parseFloat(el[2]),parseFloat(el[3]),parseFloat(el[4]),parseInt(el[5])])
        })
  
      })()
  
      console.log("staticData", staticData);
  
      setChartData(staticData);

      const options = {
        rangeSelector: {
          selected: 1
        },
    
        accessibility: {
          enabled: true
        },
    
        /*
        title: {
          text: "AAPL Historical"
        },
        */
        chart: {
          backgroundColor: '#000000',
       },
    
        yAxis: [
          {
            labels: {
              align: "right",
              x: -3
            },
            title: {
              text: "ETH-USD"
            },
            height: "100%",
            lineWidth: 2,
            resize: {
              enabled: true
            }
          },
    
        ],
    
        tooltip: {
          split: true
        },
    
        series: [
          {
            type: "candlestick",
            name: "ETH-USD",
            data: chartData,
            //data: ohlc,
            /*
            dataGrouping: {
              units: groupingUnits
            }
            */
          },
    
        ]
      };
  
      setOptions(options);

  
      
    }
    const interval = setInterval(pollDOM, 10000);
  
    return () => {
      clearInterval(interval);
  
    }
  
  }, []);


  return (
    <main className={styles.main}>
  
        
      <HighchartsReact
  highcharts={Highcharts}
  constructorType={"stockChart"}
  //options={chartOptions}
  options={options}
  //containerProps={{ style: { height: "300px", width: "400px" } }}
/>


 

      
    </main>
  )
}
