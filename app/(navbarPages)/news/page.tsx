import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
//@ts-ignore
import NewsAPI from 'newsapi';
import Articles from './Articles';
import prisma from '@/app/lib/prisma';

export const metadata: Metadata = {
  title: 'News',
};

interface NewsItem {
  title: string;
  top_image: string;
  url: string;
  date: string;
  short_description: string;
}

function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  // Days of the week and months arrays
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get components of the date
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Construct the formatted date string
  const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year} ${hours}:${minutes}${period}`;

  return formattedDate;
}

async function getNewsData() {
  const newsapi = new NewsAPI('a1ff8b8af6db41ea83f41bc015655d5c');

  try {
    const response = await newsapi.v2.topHeadlines({
      category: 'health',
      language: 'en',
      country: 'us',
      pageSize: 100,
    });

    return response.articles.map(
      (article: {
        title: string;
        urlToImage: string;
        url: string;
        publishedAt: string;
        description: string;
      }) => ({
        title: article.title,
        top_image: article.urlToImage,
        url: article.url,
        date: formatDate(article.publishedAt),
        short_description: article.description,
      })
    );

    // DB PRIMSA
  } catch (error) {
    console.error(error);
  }
}


















const News = async () => {
  const data = await getNewsData();

  let filteredArticles = data?.filter((article: NewsItem) => {
    return (
      article.title !== '[Removed]' &&
      article.top_image !== null &&
      article.short_description !== null
    );
  });

  return (
    <div className='sm:container mx-auto px-4'>
      <h1 className='text-4xl font-bold text-center my-24'>
        Latest Health News
      </h1>
      <Articles filteredArticles={filteredArticles} />
    </div>
  );
};

export default News;
