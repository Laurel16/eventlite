class EventsController < ApplicationController

def index

   @events = [

    {
title: "London Retail Expo",
datetime: "Monday 14 Oct, 2019",
location: "London Excel Centre"
},

{
title: "Enterprise Sales Training Workshop",
datetime: "Tuesday 15 Oct, 2019",
location: "Expert Sales Company Headquarters"
},

{
  title: "Ruby Hack Night",
  datetime: "Friday 18 Oct, 2019",
  location: "Learnetto Headquarters"
},
      {
        title: "Beginners Salsa dance meetup",
        datetime: "Saturday 14 Oct, 2019"
} ]
end

end
