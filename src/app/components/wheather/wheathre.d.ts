export type WeatherResponse = {
  publicTime: string;
  publicTimeFormatted: string;
  publishingOffice: string;
  title: string;
  link: string;
  description: {
    publicTime: string;
    publicTimeFormatted: string;
    headlineText: string;
    bodyText: string;
    text: string;
  };
  forecasts: Forecast[];
  location: {
    area: string;
    prefecture: string;
    district: string;
    city: string;
  };
  copyright: {
    title: string;
    link: string;
    image: {
      title: string;
      link: string;
      url: string;
      width: number;
      height: number;
    };
    provider: Provider[];
  };
};

export type Forecast = {
  date: string;
  dateLabel: string;
  telop: string;
  detail: {
    weather: string | null;
    wind: string | null;
    wave: string | null;
  };
  temperature: {
    min: Temperature;
    max: Temperature;
  };
  chanceOfRain: {
    T00_06: string;
    T06_12: string;
    T12_18: string;
    T18_24: string;
  };
  image: {
    title: string;
    url: string;
    width: number;
    height: number;
  };
};

export type Temperature = {
  celsius: string | null;
  fahrenheit: string | null;
};

export type Provider = {
  link: string;
  name: string;
  note: string;
};
