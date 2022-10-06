import Layout from "../elements/templates/Layout";
// import Header from "../elements/organisms/Header";
import Header from "../components/common/Header";
import CalendarFrame from "../components/calendar/CalendarFrame";

const Calendar = (props) => {
  return (
    <Layout>
      <Header />
      <CalendarFrame />
    </Layout>
  );
};

export default Calendar;
