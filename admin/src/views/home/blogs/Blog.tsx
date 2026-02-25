import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import BlogTable from './BlogTable';

const Blog = () => {
  return (
    <div>
      <BreadcrumbComp items={[{ title: 'Blogs', to: '/' }]} title="Blogs" />
      <CardBox>
        <BlogTable />
      </CardBox>
    </div>
  );
};

export default Blog;
