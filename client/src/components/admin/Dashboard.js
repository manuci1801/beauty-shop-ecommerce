import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

function Dashboard({ users, products, brands, news, contacts, orders }) {
  const [ordersStatistical, setOrdersStatistical] = useState([]);

  useEffect(() => {
    axios
      .get("/api/orders/admin/report")
      .then((res) => {
        setOrdersStatistical(
          res.data.sort(
            (a, b) =>
              new Date(`${a.date.year}/${a.date.month}/${a.date.day}`) -
              new Date(`${b.date.year}/${b.date.month}/${b.date.day}`)
          )
        );
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {ordersStatistical && (
        <Line
          data={{
            labels: [
              ...ordersStatistical.map(
                (e) => `${e.date.day}/${e.date.month}/${e.date.year}`
              ),
            ],
            datasets: [
              {
                data: [...ordersStatistical.map((e) => e.total)],
                label: "Doanh số",
                borderColor: "#5e72e4",
                fill: false,
              },
              // {
              //   data: expenseData,
              //   label: "CHI",
              //   borderColor: "#5e72e4",
              //   fill: false,
              // },
            ],
          }}
          options={{
            title: {
              display: true,
              text: `Báo cáo`,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      )}
    </>
  );
}

export default Dashboard;
