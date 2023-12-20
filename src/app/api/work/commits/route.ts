import { NextResponse } from "next/server";
import { Octokit } from "octokit";

interface requestGit {
  org: string;
  repo: string;
}

export async function POST(req: Request) {
  try {
    const { org, repo }: requestGit = await req.json();

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const response = await octokit.request("GET /repos/{org}/{repo}/commits", {
      org: org,
      repo: repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error al obtener los commits del repositorio",
    });
  }
}
