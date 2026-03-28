export default function Head() {
    return (
        <>
            <link
                rel="preload"
                as="image"
                href="/assets-responsive/mobile/fallback/common/view.jpg"
                media="(max-width: 767px)"
                type="image/jpeg"
            />
            <link
                rel="preload"
                as="image"
                href="/assets-responsive/web/webp/common/view.webp"
                media="(min-width: 768px)"
                type="image/webp"
            />
            <link
                rel="preload"
                as="image"
                href="/assets-responsive/web/fallback/common/view.jpg"
                media="(min-width: 768px)"
                type="image/jpeg"
            />
        </>
    );
}
