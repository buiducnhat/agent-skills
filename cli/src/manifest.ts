import fs from "node:fs";
import path from "node:path";

export interface LibraryManifest {
	version: number;
	skills: string[];
}

const MANIFEST_FILENAME = ".library-manifest.json";

export function getManifestPath(projectDir: string): string {
	return path.join(projectDir, ".ruler", "skills", MANIFEST_FILENAME);
}

export function readManifest(projectDir: string): LibraryManifest | null {
	const manifestPath = getManifestPath(projectDir);
	if (!fs.existsSync(manifestPath)) {
		return null;
	}

	try {
		const raw = fs.readFileSync(manifestPath, "utf8");
		const data = JSON.parse(raw) as Partial<LibraryManifest>;

		if (
			typeof data.version !== "number" ||
			!Array.isArray(data.skills) ||
			!data.skills.every((s) => typeof s === "string")
		) {
			return null;
		}

		return {
			version: data.version,
			skills: data.skills,
		};
	} catch {
		return null;
	}
}

export function writeManifest(projectDir: string, skills: string[]): void {
	const manifestPath = getManifestPath(projectDir);
	const manifestDir = path.dirname(manifestPath);
	fs.mkdirSync(manifestDir, { recursive: true });

	const manifest: LibraryManifest = {
		version: 1,
		skills: [...new Set(skills)].sort(),
	};

	fs.writeFileSync(
		manifestPath,
		`${JSON.stringify(manifest, null, 2)}\n`,
		"utf8",
	);
}

export function getTemplateSkillNames(tempDir: string): string[] {
	const skillsDir = path.join(tempDir, "templates", ".ruler", "skills");
	if (!fs.existsSync(skillsDir)) {
		return [];
	}

	return fs
		.readdirSync(skillsDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);
}

export function getInstalledSkillNames(projectDir: string): string[] {
	const skillsDir = path.join(projectDir, ".ruler", "skills");
	if (!fs.existsSync(skillsDir)) {
		return [];
	}

	return fs
		.readdirSync(skillsDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && entry.name !== MANIFEST_FILENAME)
		.map((entry) => entry.name);
}

export function computeDeprecatedSkills(
	oldManifest: LibraryManifest | null,
	newTemplateSkills: string[],
): string[] {
	if (!oldManifest) {
		return [];
	}

	const templateSet = new Set(newTemplateSkills);
	return oldManifest.skills.filter((skill) => !templateSet.has(skill));
}

export function computeCustomSkills(
	installedSkills: string[],
	manifestSkills: string[],
	templateSkills: string[],
): string[] {
	const templateSet = new Set(templateSkills);

	if (manifestSkills.length === 0) {
		return installedSkills.filter((skill) => !templateSet.has(skill));
	}

	const manifestSet = new Set(manifestSkills);
	return installedSkills.filter(
		(skill) => !manifestSet.has(skill) && !templateSet.has(skill),
	);
}
