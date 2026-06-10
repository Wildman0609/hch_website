import Script from "next/script";

type GoogleTagManagerProps = {
  gtmId?: string;
  metaPixelId?: string;
};

export function GoogleTagManager({ gtmId, metaPixelId }: GoogleTagManagerProps) {
  const normalizedGtmId = gtmId?.trim();
  const normalizedMetaPixelId = metaPixelId?.trim();

  return (
    <>
      <Script
        id="hch-consent-defaults"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
window.dataLayer.push({
  event: 'marketing_config',
  gtm_id_configured: ${JSON.stringify(Boolean(normalizedGtmId))},
  meta_pixel_id_configured: ${JSON.stringify(Boolean(normalizedMetaPixelId))},
  meta_pixel_id: ${JSON.stringify(normalizedMetaPixelId || null)}
});
          `.trim()
        }}
      />
      {normalizedGtmId ? (
        <Script
          id="hch-google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${JSON.stringify(normalizedGtmId)});
            `.trim()
          }}
        />
      ) : null}
    </>
  );
}

export function GoogleTagManagerNoScript({ gtmId }: GoogleTagManagerProps) {
  const normalizedGtmId = gtmId?.trim();
  if (!normalizedGtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(normalizedGtmId)}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

