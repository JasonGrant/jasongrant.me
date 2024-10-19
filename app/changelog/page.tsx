import { AlertDialog, Button, DataList, Flex, Heading, Text, Link } from '@radix-ui/themes';
import styles from "./page.module.css";

type Commit = {
    id: string;
    message: string;
    description: string;
    date: string;
    author: string;
    url: string;
}

export default async function Page() {
    const { REPO_OWNER, REPO_NAME, GITHUB_TOKEN } = process.env;
    let data = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits`, {
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`
        }
    })
    let commits = await data.json()
    let formattedCommits: Commit[] = commits.map((commit: any) => {
        const [message, ...descriptionParts] = commit.commit.message.split('\n');
        const description = descriptionParts.slice(1).join('\n').trim();
        return {
            id: commit.sha,
            message,
            description,
            date: commit.commit.author.date,
            author: commit.commit.author.name,
            url: commit.html_url
        }
    })
    return (
        <div className={styles.commitWrapper}>
            <Link href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`} className={styles.link} target="_blank">
                https://github.com/{REPO_OWNER}/{REPO_NAME}
            </Link>
            <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button color="gray" highContrast size="2">Tech behind the site</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="450px">
                                <AlertDialog.Title>Site details</AlertDialog.Title>
                                <AlertDialog.Description size="3">
                                    The portfolio was built entirely from scratch with custom code, avoiding 
                                    traditional website builders to gain full control over the design, 
                                    functionality, and user experience. It features both a traditional 
                                    portfolio with detailed case studies and an experimental, 
                                    narration-driven portfolio that uses storytelling to guide users through 
                                    a unique exploration of my work. This narrative approach allows users to 
                                    naturally drill down into specific projects, while other sections showcase 
                                    various code experiments. By structuring the site in this way, I not only 
                                    demonstrate my technical abilities but also highlight my passion for 
                                    creating distinctive, user-centered digital experiences that go beyond 
                                    conventional navigation.
                                </AlertDialog.Description>
                                <Flex mt="6" justify="start">
                                    <DataList.Root>
                                        <DataList.Item align="center">
                                            <DataList.Label minWidth="88px">
                                                Code repo
                                            </DataList.Label>
                                            <DataList.Value>
                                                <Link href="https://github.com/jasongrant" target="_blank">
                                                    Github
                                                </Link>
                                            </DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item align="center">
                                            <DataList.Label minWidth="88px">
                                                Framework
                                            </DataList.Label>
                                            <DataList.Value>
                                                <Link href="https://nextjs.org/" target="_blank">
                                                    Next.js
                                                </Link>
                                            </DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item align="center">
                                            <DataList.Label minWidth="88px">
                                                Theming and components
                                            </DataList.Label>
                                            <DataList.Value>
                                                <Link href="https://www.radix-ui.com/" target="_blank">
                                                    Radix
                                                </Link>
                                            </DataList.Value>
                                        </DataList.Item>
                                        <DataList.Item align="center">
                                            <DataList.Label minWidth="88px">
                                                Build and hosting
                                            </DataList.Label>
                                            <DataList.Value>
                                                <Link href="https://vercel.com/" target="_blank">
                                                    Vercel
                                                </Link>
                                            </DataList.Value>
                                        </DataList.Item>
                                    </DataList.Root>
                                </Flex>
                                <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" highContrast color="gray">
                                    Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
            <ul className={styles.commitList}>
                {formattedCommits.map((commit: Commit) => (
                    <li key={commit.id} className={styles.commitItem}>
                        <Heading 
                            as="h2" 
                            size="5" 
                            className={styles.commitDate}
                        >
                            {new Date(commit.date).toLocaleDateString()}
                        </Heading>
                        <Text 
                            as="p" 
                            size="4" 
                            className={styles.commitMessage}
                        >
                            {commit.message}
                        </Text>
                        <Text 
                            as="p" 
                            size="2" 
                            className={styles.commitMessage}
                        >
                            {commit.description}
                        </Text>
                    </li>
                ))}
            </ul>
        </div>
    )
}
