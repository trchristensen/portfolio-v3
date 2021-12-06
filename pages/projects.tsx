import Link from "next/link";
import { allBlogs, allProjects } from ".contentlayer/data";
import { useMemo, useState } from "react";
import Container from "components/Container/Container.component";
import { pick } from "lib/utils";
import { InferGetStaticPropsType } from "next";
import BlogPost from "components/Blog/BlogPost.component";
import prisma from "lib/prisma";
import useSWR from "swr";
import fetcher from "lib/fetcher";

export default function Projects({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState("");
  const filteredProjects = projects
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter((project) =>
      project.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  

  
  return (
    <Container
      title="Projects – Todd Christensen"
      description="Showcasing some of my recent work"
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          Projects
        </h1>
        <p className="mb-4">
         Here are a few of my projects.
        </p>
        <p className="mb-4">
          {`Use the search below to filter by title.`}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="input input-bordered block w-full px-4 py-2 border rounded-md"
          />
          <svg
            className="absolute w-5 h-5 right-3 top-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {!searchValue && (
          <>
          </>
        )}
        <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight">
          All Projects
        </h3>
        {!filteredProjects.length && <p className="mb-4">No projects found.</p>}
        {filteredProjects.map((project) => (
          <BlogPost key={project.title} {...project} />
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps() {

  const projects = allProjects.map((project) =>
    pick(project, ["slug", "title", "summary", "publishedAt"])
  );


  return { props: { projects } };
}
