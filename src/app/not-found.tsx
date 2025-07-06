import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">
          <span className="digit">4</span>
          <span className="digit">0</span>
          <span className="digit">4</span>
        </div>
        
        <h1 className="not-found-title">
          Oops! This Design is Missing
        </h1>
        
        <p className="not-found-subtitle">
          Looks like this page went off-brand.
        </p>
        
        <p className="not-found-description">
          Even the best design systems have their edge cases. 
          This page seems to have lost its visual hierarchy and wandered off the grid. 
          Let's get you back to the main canvas.
        </p>
        
        <Link href="/" className="not-found-button">
          Back to the Homepage
        </Link>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .not-found-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
            text-align: center;
            background-color: var(--page-background, #ffffff);
            color: var(--on-page-background, #000000);
          }
          
          .not-found-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            max-width: 600px;
          }
          
          .error-code {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }
          
          .digit {
            font-size: 4rem;
            font-weight: 900;
            color: var(--brand-background-strong, #0070f3);
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            animation: bounce 2s infinite;
          }
          
          .digit:nth-child(1) { animation-delay: 0s; }
          .digit:nth-child(2) { animation-delay: 0.2s; }
          .digit:nth-child(3) { animation-delay: 0.4s; }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          
          .not-found-title {
            font-size: 2.5rem;
            font-weight: 700;
            line-height: 1.1;
            margin: 0;
            color: var(--on-page-background, #000000);
          }
          
          .not-found-subtitle {
            font-size: 1.25rem;
            font-weight: 500;
            line-height: 1.4;
            margin: 0;
            color: var(--neutral-on-background-weak, #666666);
          }
          
          .not-found-description {
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.6;
            margin: 0;
            color: var(--neutral-on-background-weak, #666666);
          }
          
          .design-puns {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, var(--neutral-background-weak, #f5f5f5) 0%, var(--neutral-background-medium, #e5e5e5) 100%);
            border-radius: 1rem;
            border: 2px solid var(--brand-background-weak, #e6f3ff);
            min-width: 320px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          
          .pun-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 0.5rem;
            transition: all 0.2s ease;
          }
          
          .pun-item:hover {
            transform: translateX(4px);
            background-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          
          .pun-icon {
            font-size: 1.25rem;
            flex-shrink: 0;
          }
          
          .pun-text {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--on-page-background, #000000);
            line-height: 1.4;
          }
          
          .not-found-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.875rem 1.75rem;
            background-color: var(--brand-background-strong, #010101);
            color: var(--brand-on-background-strong, #ffffff);
            text-decoration: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 112, 243, 0.3);
          }
          
          .not-found-button:hover {
            background-color: var(--brand-background-strong-hover, #010101);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 112, 243, 0.4);
          }
          
          .button-icon {
            flex-shrink: 0;
          }
          
          .button-arrow {
            flex-shrink: 0;
          }
          
          @media (max-width: 768px) {
            .digit {
              font-size: 3rem;
            }
            
            .not-found-title {
              font-size: 2rem;
            }
            
            .not-found-subtitle {
              font-size: 1.125rem;
            }
            
            .not-found-description {
              font-size: 0.875rem;
            }
            
            .design-puns {
              min-width: 280px;
              padding: 1rem;
            }
            
            .pun-text {
              font-size: 0.8rem;
            }
          }
        `
      }} />
    </div>
  );
} 