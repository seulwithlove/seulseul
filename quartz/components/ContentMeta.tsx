import type { JSX } from "preact";
import readingTime from "reading-time";
import { i18n } from "../i18n";
import { classNames } from "../util/lang";
import { Date as DateComponent } from "./Date";
import style from "./styles/contentMeta.scss";
import type { QuartzComponentConstructor, QuartzComponentProps } from "./types";

interface ContentMetaOptions {
	/**
	 * Whether to display reading time
	 */
	showReadingTime: boolean;
	showModifiedTime: boolean;
	showComma: boolean;
}

const defaultOptions: ContentMetaOptions = {
	showReadingTime: true,
	showModifiedTime: true,
	showComma: true,
};

export default ((opts?: Partial<ContentMetaOptions>) => {
	// Merge options with defaults
	const options: ContentMetaOptions = { ...defaultOptions, ...opts };

	function ContentMetadata({
		cfg,
		fileData,
		displayClass,
	}: QuartzComponentProps) {
		const text = fileData.text;

		if (text) {
			const segments: (string | JSX.Element)[] = [];

			if (fileData.dates) {
				// Show creation date if available
				if (fileData.dates.created) {
					segments.push(
						<span>
							작성일:{" "}
							<DateComponent
								date={fileData.dates.created}
								locale={cfg.locale}
							/>
						</span>,
					);
				}

				// Show modification date if available and different from creation
				if (
					fileData.dates.modified &&
					(!fileData.dates.created ||
						Math.abs(
							fileData.dates.modified.getTime() -
								fileData.dates.created.getTime(),
						) > 60000)
				) {
					segments.push(
						<span>
							수정일:{" "}
							<DateComponent
								date={fileData.dates.modified}
								locale={cfg.locale}
							/>
						</span>,
					);
				}
			}

			// Display reading time if enabled
			if (options.showReadingTime) {
				const { minutes, words: _words } = readingTime(text);
				const displayedTime = i18n(
					cfg.locale,
				).components.contentMeta.readingTime({
					minutes: Math.ceil(minutes),
				});
				segments.push(<span>{displayedTime}</span>);
			}

			return (
				<p
					show-comma={options.showComma}
					class={classNames(displayClass, "content-meta")}
				>
					{segments}
				</p>
			);
		} else {
			return null;
		}
	}

	ContentMetadata.css = style;

	return ContentMetadata;
}) satisfies QuartzComponentConstructor;
