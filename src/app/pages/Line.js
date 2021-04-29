import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const LineExample = () => {
  const [WeekFirstPoint, SetFirstWeekPoint] = useState([""]);
  const [FirstWeek, SetFirstWeek] = useState([""]);

  const [WeekSecondPoint, SetWeekSecondPoint] = useState([""]);
  const [SecondWeek, SetSecondWeek] = useState([""]);

  const [WeekThirdPoint, SetThirdWeekPoint] = useState([""]);
  const [ThirdWeek, SetThirdWeek] = useState([""]);

  const [WeekForthPoint, SetWeekForthPoint] = useState([""]);
  const [ForthtWeek, SetForthtWeek] = useState([""]);

  const [WeekFifthPoint, SetWeekFifthPoint] = useState([""]);
  const [FifthWeek, SetFifthWeek] = useState([""]);

  const [WeekSixthPoint, SetWeekSixthPoint] = useState(0);
  const [SixthWeek, SetSixthWeek] = useState([""]);

  const [WeekSeventhPoint, SetWeekSeventhPoint] = useState(0);
  const [SeventhWeek, SetSeventhWeek] = useState("");

  const data = {
    labels: [
      FirstWeek,
      SecondWeek,
      ThirdWeek,
      ForthtWeek,
      FifthWeek,
      SixthWeek,
      SeventhWeek,
    ],
    datasets: [
      {
        label: "ポイント推移",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "round",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "square",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#eee",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          WeekFirstPoint,
          WeekSecondPoint,
          WeekThirdPoint,
          WeekForthPoint,
          WeekFifthPoint,
          WeekSixthPoint,
          WeekSeventhPoint,
        ],
      },
    ],
  };
  useEffect(() => {
    filterUser();
  }, []);

  const GetUserInfo = () => {
    const response = axios
      .post(`${process.env.REACT_APP_API_URL}/api/users`, {
        token: localStorage.getItem("token"),
      })
      .then((response) => {
        return response.data;
      });
    return response;
  };

  const filterUser = async () => {
    const catchresponse = await GetUserInfo();
    const filterWeekpoint = catchresponse.map((user) => user.WeekPoint);
    const test = JSON.parse(filterWeekpoint).flat();
    const indexes = test.map((user, index) => index);
    const LastestDayIndex = Math.max(...indexes);
    const LastDayIndex = Math.min(...indexes);

    if (test.length > 0) {
      SetFirstWeekPoint(Object.values(test[LastDayIndex]).join());
      SetFirstWeek(Object.keys(test[LastDayIndex]).join());
    }

    if (test.length > 1 && SecondWeek !== "undefined") {
      SetWeekSecondPoint(Object.values(test[1]).join());
      SetSecondWeek(Object.keys(test[1]).join());
    }
    if (test.length > 2 && ThirdWeek !== "undefined") {
      SetThirdWeekPoint(Object.values(test[2]).join());
      SetThirdWeek(Object.keys(test[2]).join());
    }
    if (test.length > 3 && ForthtWeek !== "undefined") {
      SetWeekForthPoint(Object.values(test[3]).join());
      SetForthtWeek(Object.keys(test[3]).join());
    }
    if (test.length > 4 && FifthWeek !== "undefined") {
      SetWeekFifthPoint(Object.values(test[4]).join());
      SetFifthWeek(Object.keys(test[4]).join());
    }
    if (test.length > 5 && SixthWeek !== "undefined") {
      SetWeekSixthPoint(Object.values(test[5]).join());
      SetSixthWeek(Object.keys(test[5]).join());
    }

    if (test.length > 6 && SeventhWeek !== "undefined") {
      SetWeekSeventhPoint(Object.values(test[LastestDayIndex]).join());
      SetSeventhWeek(Object.keys(test[LastestDayIndex]).join());
    }
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineExample;
