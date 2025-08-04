export interface ExperienceSection {
	role: string;
	start: string;
	end?: string;
	org?: string;
	skills: string[];
	summary: string;
	details?: string[];
}

export const industry = [
	{
		role: 'Freelance Fullstack Developer',
		start: '09/22',
		org: 'Self-employed',
		skills: [
			'Python',
			'Vue',
			'PrimeVue',
			'Svelte',
			'SQLite',
			'FastAPI',
			'uv',
			'docker',
			'GitHub Actions'
		],
		summary: 'Developing various apps and site for clients.'
	},
	{
		role: 'Senior Software Developer',
		start: '10/21',
		end: '08/22',
		org: 'Karsa (Startup)',
		skills: [
			'Python',
			'JavaScript',
			'Vue',
			'Buefy',
			'HTML5',
			'CSS3',
			'SQLite',
			'Gitlab'
		],
		summary:
			'Built software allowing non-technical users to detect chemicals using a mass spectrometer.',
		details: [
			'Independently designed, developed and delivered major features of the MVP.',
			'Introduced major performance improvements that made the product usable despite large datasets and analytical queries.',
			'Standardized Javascript and Python code and framework style to improve team velocity, reduce the maintenance burden and ease onboarding of new developers.',
			'Introduced Docker containerization and tooling, and Git best-practices.'
		]
	},
	{
		role: 'Product Owner',
		start: '10/19',
		end: '02/21',
		org: 'Sievo (Enterprise SaaS Scaleup)',
		skills: [
			'Agile',
			'Backlog Grooming',
			'Spring Planning',
			'Multistakeholder communication',
			'Marketing',
			'QlikSense'
		],
		summary:
			'Worked alongside the product manager to plan, prioritize and manage technical development, coordinating between stakeholders.',
		details: [
			'Coordinated ticket backlog, roadmapping and architecture for core AI microservices.',
			'Facilitated agile processes such as backlog grooming, retrospectives and post-mortems.',
			'Managed stakeholder communication between developers, marketing, sales, design and senior management.',
			'Participated in sales and support meetings with customer and prospect stakeholders.',
			'Hosted customer webinars and helped develop other marketing material.',
			'Designed and implemented new drill-down analytics dashboards.',
			'Drafted a successful €2M+ Eurostars funding application for a new sustainability product, leveraging environmental and social LCA to enable quantitative CSR.'
		]
	},
	{
		role: 'Data Scientist',
		start: '09/17',
		end: '09/19',
		org: 'Sievo (Enterprise SaaS Scaleup)',
		skills: ['Python', 'NLP', 'Docker', 'SQLServer', 'Jira', 'Jenkins', 'Bash'],
		summary:
			'Developed a new NLP-driven supplier record normalization microservice in Python.',
		details: [
			'Coarchitected, implemented, deployed and supported a human-in-the-loop AI microservice with internal UI.',
			'Took ownership of DevOps tasks such as containerization, CI/CD pipelines and Git practices and	tooling.',
			'Facilitated organization wide knowledge building in data science by organizing a weekly seminar exploring new tools and methods.'
		]
	},
	{
		role: 'Graphic Designer & WordPress Developer',
		start: '2004',
		end: '2017',
		skills: ['Illustrator', 'Photoshop', 'WordPress', 'Bash'],
		summary:
			'Executed graphic and web design, branding and copywriting jobs for small companies.'
	},
	{
		role: 'EU Grant Writer',
		start: '05/21',
		end: '11/21',
		skills: ['Technical Writing', 'Project Management', 'EU Grants'],
		summary:
			'Freelanced as writer of Eurostars grant applications and helped develop projects and consortia for R&D performing SMEs.'
	}
] as ExperienceSection[];

export const academic = [
	{
		role: 'Ecology Researcher',
		start: '06/14',
		end: '04/15',
		org: 'MRC, University of Helsinki',
		skills: ['R', 'Stochastic Processes', 'Metacommunity Theory'],
		summary: 'Developed a stochastic spatial ecology simulation framework.'
	},
	{
		role: 'MSc Biomathematics',
		start: '2009',
		end: '2013',
		org: 'University of Vienna',
		skills: [
			'Networks',
			'Stochastic Processes',
			'Probability',
			'Dynamical Systems',
			'Game Theory',
			'Population Genetics',
			'Philosophy of Science'
		],
		summary:
			'Specialized in stochastic processes and risk management in biological and social networks.'
	},
	{
		role: 'Private Tutor',
		start: '2010',
		end: '2017',
		skills: ['Mathematics', 'Physics', 'Pedagogy', 'Empathy'],
		summary:
			'Tutoring children of various ages in mathematics, physics and chemistry.'
	},
	{
		role: 'BSc Mathematics & Physics',
		start: '2005',
		end: '2009',
		org: 'University of Utrecht',
		skills: ['Scientific Methodology', 'Elements of Physics & Mathematics'],
		summary:
			'Double degree covering the basics of the Physics and Mathematics disciplines.'
	}
] as ExperienceSection[];

export const volunteering = [
	{
		role: 'Open-Source Maintainer',
		start: '03/23',
		end: '09/24',
		org: 'Threlte (Core Team)',
		skills: ['Svelte', 'Three.js', 'Theatre.js', 'FOSS Community'],
		summary:
			'Core team member in the leading Svelte framework for 3D graphics in the web. Contributed major PRs and played a key role in community engagement and team organization.'
	},
	{
		role: 'WWOOFer / Farmhand ',
		start: '07/23',
		end: '04/24',
		org: 'Organic Farms',
		skills: ['Permaculture', 'No-till', 'Homesteading', 'Livestock'],
		summary:
			'Volunteered in a small commercial organic vegetable farm in Provence and a mountain homesteading farm in the Savoie.'
	},
	{
		role: 'Web Developer & Designer',
		start: '01/23',
		end: '07/23',
		org: 'Global Ecovillage Network',
		skills: [
			'WordPress',
			'Associative Sector',
			'Ecovillages',
			'Multitiered Orgs'
		],
		summary:
			"Helped streamline a legacy website's navigation and content in preperation for fundraising. The site had decades of legacy content and plugins contributed by dozens of volunteers. The network is composed of several regional organizations, making the site complex."
	}
];
