import { useTranslation } from 'next-i18next';
import faqs from './data/faq.json';

const FAQSection = () => {
  const { t } = useTranslation('common');

  return (
    <section className="py-6">
      <div className="flex flex-col justify-center space-y-6">
        <h2 className="text-center text-4xl font-bold normal-case">
          {t('frequently-asked')}
        </h2>
        <p className="text-center text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-2 w-full max-w-2xl">
            {faqs.map((faq, index) => (
              <article
                key={index}
                className="card bg-base-100 shadow border border-gray-300 dark:border-gray-200"
              >
                <div className="card-body">
                  <h3 className="card-title">Q. {faq.question}</h3>
                  <p>A. {faq.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;