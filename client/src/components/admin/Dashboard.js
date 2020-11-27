import React from "react";
import { Line } from "react-chartjs-2";

function Dashboard({ users, products, brands, news, contacts }) {
  return (
    <>
      <Line
        data={{
          labels: [2020],
          datasets: [
            {
              data: [22],
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
    </>
  );
}

export default Dashboard;
