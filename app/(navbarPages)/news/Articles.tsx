'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/app/components/Button';
import ScrollToTop from 'react-scroll-to-top';
import BackToTopArrow from './BackToTopArrow';
import { useWindowSize } from 'react-use';

interface NewsItem {
  title: string;
  top_image: string | null;
  url: string;
  date: string;
  short_description: string;
}

interface ArticlesProps {
  filteredArticles: NewsItem[];
}
const Articles: React.FC<ArticlesProps> = ({ filteredArticles }) => {
  const [visibleArticles, setVisibleArticles] = useState(16);

  const loadMoreArticles = () => {
    setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 16);
  };

  const { width } = useWindowSize();

  const arrowBottom = width > 768 ? '26px' : '21px';

  const arrowRight = width > 768 ? '120px' : '70px';

  const widthAndHeight = width > 768 ? '40px' : '35px';

  console.log(filteredArticles);

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
        {filteredArticles
          .slice(0, visibleArticles)
          .map((article: NewsItem, index: number) => (
            <article
              // key={article.id}
              className='bg-white rounded-lg shadow-xl p-8 relative flex flex-col justify-between '
            >
              <h2 className='text-3xl font-semibold mb-4 '>{article.title}</h2>
              {article.top_image !== null && (
                // Image
                <div className='mb-8'>
                  <Image
                    src={article.top_image}
                    width={300}
                    height={300}
                    alt='Picture of the image'
                    className='rounded-xl'
                  />
                </div>
              )}{' '}
              {/* Description */}
              <p className='text-gray-700 mb-12 text-lg'>
                {article.short_description}
              </p>
              {/* Date & LInk */}
              <div className=' '>
                <p className='text-gray-'>{article.date}</p>
                <a
                  href={article.url}
                  className='text-purple-900 hover:underline text-lg '
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Read more
                </a>
              </div>
            </article>
          ))}
      </div>
      {/* load more  button */}
      {visibleArticles < 60 && (
        <div className='flex justify-center mb-10'>
          <Button color='purple' size='large' onClick={loadMoreArticles}>
            Load More
          </Button>
        </div>
      )}

      <ScrollToTop
        smooth
        component={<BackToTopArrow />}
        style={{
          bottom: arrowBottom,
          right: arrowRight,
          background: '#581C87',
          width: widthAndHeight,
          height: widthAndHeight,
          padding: '5px',
          zIndex: 1000,
          cursor: 'pointer',
        }}
      />
    </>
  );
};

export default Articles;
