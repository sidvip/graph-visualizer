/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import Chart from 'chart.js/auto';
import { useEffect, useRef } from "react"
import html2PDF from 'jspdf-html2canvas';

export default function ArrestChart({ chartData, setPrinting }) {
    const chartVar = useRef();
    const ref = useRef();
    const imgRef = useRef();
    let isPrint = false;
    const labels = chartData.data.map((ele) => ele.data_year);
    const data = chartData.data.map((ele) => ele.Burglary);

    useEffect(() => {
        if (chartVar.current) {
            chartVar.current.destroy();
        }
        chartVar.current = new Chart(ref.current, {
            type: 'line',
            responsive: true,
            data: {
                labels,
                datasets: [{
                    data,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                padding: 10,
                layout: {
                    padding: 30
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    customCanvasBackgroundColor: {
                        color: 'lightGreen',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                    x: {
                        grid: {
                            display: false,
                        }
                    }
                }
            },
            plugins: [{
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                    const { ctx } = chart;
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                },
                afterDraw: (chart, args, options) => {
                    // console.log(chart.toBase64Image());
                    imgRef.current.src = chart.toBase64Image();

                    if (isPrint === false) {
                        setPrinting(true);
                        setTimeout(() => {
                            html2PDF(document.getElementsByClassName("a4")[0], {
                                jsPDF: {
                                    format: 'a4',
                                },
                                imageType: 'image/jpeg',
                                output: './pdf/page.pdf'
                            });
                            setPrinting(false);
                        }, 4000);
                    }
                    isPrint = true;
                }
            }]
        });
    }, []);
    return (
        <div className="drawing-area">
            <canvas ref={ref} style={{ borderRadius: '50px', display: 'none' }}></canvas>
            <img ref={imgRef} alt="chart" className="img-graph" />
        </div>
    )
}