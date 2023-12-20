import { NextResponse } from "next/server";
import { Octokit } from "octokit";

interface requestGit {
  org: string;
  repo: string;
  ref: string;
}

export async function POST(req: Request) {
  try {
    const { org, repo, ref }: requestGit = await req.json();

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/commits/{ref}",
      {
        owner: org,
        repo: repo,
        ref: ref,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error al obtener los detalles del commit",
    });
  }
}
